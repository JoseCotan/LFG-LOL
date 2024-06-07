import React from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import ButtonColores from '@/Components/ButtonColores';
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import TextArea from '@/Components/TextArea';


const EventosEdit = () => {
    const { auth, evento } = usePage().props;
    const { data, setData, put, processing } = useForm({
        titulo: evento.titulo || '',
        descripcion: evento.descripcion || '',
        acceso_publico: evento.acceso_publico || false,
        acceso_amigos: evento.acceso_amigos || false,
        acceso_miembros_equipo: evento.acceso_miembros_equipo || false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('eventos.update', evento.id), {
            onSuccess: () => {
                setData('titulo', '');
                setData('descripcion', '');
                setData('acceso_publico', true);
                setData('acceso_amigos', true);
                setData('acceso_miembros_equipo', true);
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-4xl mx-auto p-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <InputLabel value="Título del Evento" />
                        <TextInput
                            id="titulo"
                            type="text"
                            value={data.titulo}
                            onChange={(e) => setData('titulo', e.target.value)}
                            required
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div className="mb-6">
                        <InputLabel value="Descripción" />
                        <TextArea
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <InputLabel value="Acceso Público" />
                        <Checkbox
                            id="acceso_publico"
                            checked={data.acceso_publico}
                            onChange={(e) => setData('acceso_publico', e.target.checked)}
                        />
                        <span>Evento Público</span>
                    </div>
                    <div className="mb-6">
                        <InputLabel value="Acceso Amigos" />
                        <Checkbox
                            id="acceso_amigos"
                            checked={data.acceso_amigos}
                            onChange={(e) => setData('acceso_amigos', e.target.checked)}
                        />
                        <span>Acceso Amigos</span>
                    </div>
                    <div className="mb-6">
                        <InputLabel value="Acceso Miembros del Equipo" />
                        <Checkbox
                            id="acceso_miembros_equipo"
                            checked={data.acceso_miembros_equipo}
                            onChange={(e) => setData('acceso_miembros_equipo', e.target.checked)}
                        />
                        <span>Acceso Miembros del Equipo</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <ButtonColores color="green" disabled={processing}>Crear Evento</ButtonColores>
                        <Link href={route('eventos.index')}>
                            <ButtonColores color="blue">
                                Cancelar
                            </ButtonColores>
                        </Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default EventosEdit;
