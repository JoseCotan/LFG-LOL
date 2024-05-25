import React from 'react';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import InputError from '@/Components/InputError';

export default function UpdateLeagueOfLegendsNickForm() {
    const { data, setData, post, errors, processing } = useForm({
        nick: '',
        tag: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('profile.updateLeagueOfLegendsNick'));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <InputLabel htmlFor="nick" value="Nombre de League of Legends" />
                <TextInput
                    id="nick"
                    type="text"
                    value={data.nick}
                    onChange={(e) => setData('nick', e.target.value)}
                    required
                />
                <InputError message={errors.nick} />
            </div>
            <div>
                <InputLabel htmlFor="tag" value="Tag del nombre de League of Legends" />
                <TextInput
                    id="tag"
                    type="text"
                    value={data.tag}
                    onChange={(e) => setData('tag', e.target.value)}
                    required
                />
                <InputError message={errors.tag} />
            </div>
            <div className="flex items-center mt-4">
                <PrimaryButton disabled={processing || !data.nick || !data.tag}>
                    Guardar nick
                </PrimaryButton>
            </div>
        </form>
    );
}
