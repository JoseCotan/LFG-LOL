import React from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';


const CreatePublicacion = () => {
    const { auth, modos, roles, rangos } = usePage().props;
    const { data, setData, post, processing } = useForm({
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
                    <InputLabel value="Título" />
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
                        <textarea
                            id="descripcion"
                            value={data.descripcion}
                            onChange={(e) => setData('descripcion', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        />
                    </div>
                    <div className="mb-6">
                    <InputLabel value="Modo de juego" />
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
                    <InputLabel value="Rol del juego" />
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
                    <InputLabel value="Rango del juego" />
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
                    <InputLabel value="Hora preferente de inicio" />
                        <TextInput
                            type="time"
                            id="hora_preferente_inicio"
                            value={data.hora_preferente_inicio}
                            onChange={(e) => setData('hora_preferente_inicio', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
                    </div>
                    <div className="mb-6">
                    <InputLabel value="Hora preferente final" />
                        <TextInput
                            type="time"
                            id="hora_preferente_final"
                            value={data.hora_preferente_final}
                            onChange={(e) => setData('hora_preferente_final', e.target.value)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            required
                        />
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
