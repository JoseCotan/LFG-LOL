import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Button from '@/Components/Button';
import Input from '@/Components/Input';
import Checkbox from '@/Components/Checkbox';
import Select from '@/Components/Select';
import InputLabel from '@/Components/InputLabel';


const EquiposEdit = () => {
    const { auth, equipo, modos, usuarios } = usePage().props;
    const { data, setData, put, processing } = useForm({
        nombre_equipo: equipo.nombre_equipo || '',
        modo_juego_preferente: equipo.modo_juego_preferente || '',
        privado: equipo.privado || false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('equipos.update', equipo.id));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
            <div className="max-w-4xl mx-auto p-8">
                <form onSubmit={handleSubmit}>
                    <InputLabel value="Nombre del Equipo" />
                    <Input
                        name="nombre_equipo"
                        value={data.nombre_equipo}
                        onChange={e => setData('nombre_equipo', e.target.value)}
                    />
                    <InputLabel value="Modo de juego preferente" />
                    <Select
                        name="modo_juego_preferente"
                        value={data.modo_juego_preferente}
                        onChange={e => setData('modo_juego_preferente', e.target.value)}
                        options={modos.map((modo) => ({
                            value: modo.id,
                            label: modo.nombre
                        }))}
                    />
                    <InputLabel value="Equipo privado" />
                    <Checkbox
                        name="privado"
                        checked={data.privado}
                        onChange={e => setData('privado', e.target.checked)}
                    />
                    <Button disabled={processing}>
                        Actualizar Equipo
                    </Button>
                </form>
            </div>
        </AuthenticatedLayout>
    );
};

export default EquiposEdit;
