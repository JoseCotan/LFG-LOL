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
                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-gray-900 shadow sm:rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-4 sm:p-8 bg-gray-900 shadow sm:rounded-lg">
                        <UpdateProfileImageForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-gray-900 shadow sm:rounded-lg">
                        <UpdateLeagueOfLegendsNickForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-gray-900 shadow sm:rounded-lg">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-4 sm:p-8 bg-gray-900 shadow sm:rounded-lg">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
