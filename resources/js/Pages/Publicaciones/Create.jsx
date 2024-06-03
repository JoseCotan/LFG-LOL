import React from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import TextArea from '@/Components/TextArea';
import InputError from '@/Components/InputError';

const CreatePublicacion = () => {
    const { auth, modos, roles, rangos } = usePage().props;
    const { data, setData, post, processing, errors, setError } = useForm({
        titulo: '',
        descripcion: '',
        modo_id: '',
        rol_id: '',
        rango_id: '',
        hora_preferente_inicio: '',
        hora_preferente_final: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('publicaciones.store'), data, {
            onSuccess: () => {
                setData({
                    titulo: '',
                    descripcion: '',
                    modo_id: '',
                    rol_id: '',
                    rango_id: '',
                    hora_preferente_inicio: '',
                    hora_preferente_final: ''
                });
            }
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-4xl mx-auto p-8">
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
                                // Comprueba que el título no pueda estar vacío.
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
                        <InputLabel htmlFor="modo_id" value="Modo de juego" />
                        <select
                            id="modo_id"
                            value={data.modo_id}
                            onChange={(e) => setData('modo_id', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            {modos.map((modo) => (
                                <option key={modo.id} value={modo.id}>{modo.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="rol_id" value="Rol del juego" />
                        <select
                            id="rol_id"
                            value={data.rol_id}
                            onChange={(e) => setData('rol_id', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            {roles.map((rol) => (
                                <option key={rol.id} value={rol.id}>{rol.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="rango_id" value="Rango del juego" />
                        <select
                            id="rango_id"
                            value={data.rango_id}
                            onChange={(e) => setData('rango_id', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        >
                            {rangos.map((rango) => (
                                <option key={rango.id} value={rango.id}>{rango.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <InputLabel htmlFor="hora_preferente_inicio" value="Hora preferente de inicio" />
                        <TextInput
                            id="hora_preferente_inicio"
                            type="time"
                            value={data.hora_preferente_inicio}
                            onChange={(e) => setData('hora_preferente_inicio', e.target.value)}
                            onBlur={() => {
                                // Comprueba si la hora de inicio es antes que la hora final.
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
                                // Comprueba si la hora final es antes que la hora de inicio.
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
                        <PrimaryButton disabled={processing}>Crear publicación</PrimaryButton>
                        <Link href={route('publicaciones.index')} className="text-sm text-blue-600 hover:text-blue-800">Cancelar</Link>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default CreatePublicacion;
