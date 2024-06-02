import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import GuestLayout from '@/Layouts/GuestLayout';
import { usePage } from '@inertiajs/react';

export default function LayoutSwitcher({ children, header }) {
    const { auth } = usePage().props;

    if (auth && auth.user) {
        return <AuthenticatedLayout user={auth.user} header={header}>{children}</AuthenticatedLayout>;
    } else {
        return <GuestLayout header={header}>{children}</GuestLayout>;
    }
}
