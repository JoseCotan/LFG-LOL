<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Correo Electrónico</title>
    <style>
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9fafb;
            font-family: Arial, sans-serif;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
        }

        .logo {
            max-width: 200px;
            margin-bottom: 20px;
        }

        .message {
            background-color: #ffffff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .sender {
            font-weight: bold;
            margin-bottom: 10px;
            color: #333333;
        }

        .footer {
            margin-top: 20px;
            text-align: center;
            color: #666666;
        }

        .link {
            color: #007bff;
            text-decoration: none;
        }

        .link:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="{{ asset('images/logo.png') }}" alt="Logo de la Aplicación" class="logo">
        </div>
        <div class="message">
            <p class="sender">Mensaje por parte de {{ $remitente->name }}:</p>
            <p>{{ $contenidoMensaje }}</p>
        </div>
        <div class="footer">
            <p>Has recibido un mensaje por parte de uno de nuestros usuarios.</p>
            <p>Puedes visitar nuestro <a href="{{ route('inicio') }}" class="link">sitio web</a> para más información.</p>
        </div>
    </div>
</body>
</html>
