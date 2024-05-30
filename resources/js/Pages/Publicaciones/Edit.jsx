import React from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import TextArea from '@/Components/TextArea';
import Select from '@/Components/Select';
import DangerButton from '@/Components/DangerButton';
import Button from '@/Components/Button';


const EditPublicacion = () => {
    const { auth, modos, roles, rangos, publicacion } = usePage().props;
    const { data, setData, put, processing, errors, setError } = useForm({
        titulo: publicacion.titulo || '',
        descripcion: publicacion.descripcion || '',
        modo_id: publicacion.modo_id || '',
        rol_id: publicacion.rol_id || '',
        rango_id: publicacion.rango_id || '',
        hora_preferente_inicio: publicacion.hora_preferente_inicio || '',
        hora_preferente_final: publicacion.hora_preferente_final || ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('publicaciones.update', publicacion.id));
    };

    const handleDelete = (id) => {
        Inertia.delete(route('publicaciones.destroy', id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-3xl mx-auto p-8">
                <form onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <InputLabel htmlFor="titulo" value="Título" />
                        <TextInput
                            id="titulo"
                            type="text"
                            value={data.titulo}
                            onChange={(e) => setData('titulo', e.target.value)}
                            className="mt-1 block w-full"
                            autoComplete="titulo"
                            required
                            onBlur={(e) => {
                                if (e.target.value === '') {
                                    setError('titulo', 'El título no puede estar vacío.');
                                } else {
                                    setError('titulo', '');
                                }
                            }}
                        />
                        <InputError message={errors.titulo} className="mt-2" />
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="descripcion" className="block text-lg font-bold mb-2">Descripción</InputLabel>
                        <TextArea data={data} setData={setData} />
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="modo_id" value="Modo de juego" />
                        <Select
                            value={data.modo_id}
                            onChange={(e) => setData('modo_id', e.target.value)}
                            options={modos.map((modo) => ({ value: modo.id, label: modo.nombre }))}
                            className=""
                            id="modo_id"
                        />
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="rol_id" value="Rol del juego" />
                        <Select
                            value={data.rol_id}
                            onChange={(e) => setData('rol_id', e.target.value)}
                            options={roles.map((rol) => ({ value: rol.id, label: rol.nombre }))}
                            id="rol_id"
                        />
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="rango_id" value="Rango del juego" />
                        <Select
                            value={data.rango_id}
                            onChange={(e) => setData('rango_id', e.target.value)}
                            options={rangos.map((rango) => ({ value: rango.id, label: rango.nombre }))}
                            id="rango_id"
                        />
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="hora_preferente_inicio" value="Hora preferente de inicio" />
                        <TextInput
                            id="hora_preferente_inicio"
                            type="time"
                            value={data.hora_preferente_inicio}
                            onChange={(e) => setData('hora_preferente_inicio', e.target.value)}
                            onBlur={() => {
                                if (data.hora_preferente_final && data.hora_preferente_inicio >= data.hora_preferente_final) {
                                    setError('hora_preferente_inicio', 'La hora de inicio debe ser menor que la hora final.');
                                } else {
                                    setError('hora_preferente_inicio', '');
                                }
                            }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                        <InputError message={errors.hora_preferente_inicio} className="mt-2" />
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="hora_preferente_final" value="Hora preferente final" />
                        <TextInput
                            id="hora_preferente_final"
                            type="time"
                            value={data.hora_preferente_final}
                            onChange={(e) => setData('hora_preferente_final', e.target.value)}
                            onBlur={() => {
                                if (data.hora_preferente_inicio && data.hora_preferente_inicio >= data.hora_preferente_final) {
                                    setError('hora_preferente_final', 'La hora final debe ser mayor que la hora de inicio.');
                                } else {
                                    setError('hora_preferente_final', '');
                                }
                            }}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                        <InputError message={errors.hora_preferente_final} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-between">
                        <PrimaryButton disabled={processing ? 'true' : undefined}>Actualizar Publicación</PrimaryButton>
                        <DangerButton onClick={() => handleDelete(publicacion.id)}>
                            Eliminar Publicación
                        </DangerButton>
                        <Button href={route('publicaciones.index')} className="text-sm text-blue-600 hover:text-blue-800">Volver</Button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default EditPublicacion;
