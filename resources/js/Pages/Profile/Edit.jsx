import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileImageForm from './Partials/UpdateProfileImageForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdateLeagueOfLegendsNickForm from './Partials/UpdateLeagueOfLegendsNickForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <div className="py-12">
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-6 ml-4 mr-4 rounded-lg sm:rounded-lg">
                <div className="p-4 sm:p-8 bg-gray-900 shadow rounded-lg sm:rounded-none">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-gray-900 shadow rounded-lg sm:rounded-none">
                        <UpdateProfileImageForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-gray-900 shadow rounded-lg sm:rounded-none">
                        <UpdateLeagueOfLegendsNickForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-gray-900 shadow rounded-lg sm:rounded-none">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-gray-900 shadow rounded-lg sm:rounded-none">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
