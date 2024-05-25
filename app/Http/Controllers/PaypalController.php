<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use LDAP\Result;
use Srmklive\PayPal\Services\PayPal as PayPalClient;


class PaypalController extends Controller
{
    /**
     * Display a listing of the resources
     */

    public function index()
    {
        return view('paypal');
    }

    public function paypal(Request $request)
    {
        $provider = new PaypalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();
        $response = $provider->createOrder([
            "intent" => "CAPTURE",
            "application_context" => [
                "return_url" => route('success'),
                "cancel_url" => route('cancel')
            ],
            "purchase_units" => [
                [
                    "amount" => [
                        "currency_code" => "EUR",
                        "value" => $request->price
                    ]
                ]
            ]
        ]);
        //dd($response);
        if (isset($response['id']) && $response['id'] != null) {
            foreach ($response['links'] as $link) {
                if ($link['rel'] == 'approve') {
                    session()->put('product_name', $request->product_name);
                    session()->put('quantity', $request->quantity);
                    return redirect()->away($link['href']);
                }
            }
        } else {
            return redirect()->route('cancel');
        }
    }

    public function success(Request $request)
    {
        $provider = new PayPalClient;
        $provider->setApiCredentials(config('paypal'));
        $provider->getAccessToken();
        $response = $provider->capturePaymentOrder($request->token);
        //dd($response);

        if (isset($response['status']) && $response['status'] == 'COMPLETED') {
            $user = Auth::user();
            $payment = new Payment;
            $payment->payment_id = $response['id'];
            $payment->product_name = session()->get('product_name');
            $payment->quantity = session()->get('quantity');
            $payment->amount = $response['purchase_units'][0]['payments']['captures'][0]['amount']['value'];
            $payment->currency = $response['purchase_units'][0]['payments']['captures'][0]['amount']['currency_code'];
            $payment->payer_name = $response['payer']['name']['given_name'];
            $payment->payer_email = $response['payer']['email_address'];
            $payment->payment_status = $response['status'];
            $payment->payment_method = "PayPal";

            $user->VIP = true;
            $user->save();
            $payment->save();

            return "El pago se realizó correctamente";
        } else {
            return redirect()->route('cancel');
        }
    }

    public function cancel()
    {
        return "El pago fue cancelado.";
    }
}
