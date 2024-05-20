import React from 'react';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function UpdateLeagueOfLegendsNickForm() {
    const { data, setData, post, errors, processing } = useForm({
        nombreLOL: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('profile.updateLeagueOfLegendsNick'));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <InputLabel htmlFor="nombreLOL" value="Nombre de League of Legends" />
                <TextInput
                    id="nombreLOL"
                    type="text"
                    value={data.nombreLOL}
                    onChange={(e) => setData('nombreLOL', e.target.value)}
                    required
                />
                <InputError message={errors.nombreLOL} />
            </div>
            <div className="flex items-center mt-4">
                <PrimaryButton disabled={processing || !data.nombreLOL}>
                    Guardar nick
                </PrimaryButton>
            </div>
        </form>
    );
}
