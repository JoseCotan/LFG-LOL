import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { usePage, Link } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';
import Button from '@/Components/Button';

const EquipoShow = () => {
    const { equipo, auth } = usePage().props;

    // Verifica si el usuario actual es miembro del equipo
    const esMiembro = [
        equipo.miembro1?.id,
        equipo.miembro2?.id,
        equipo.miembro3?.id,
        equipo.miembro4?.id,
        equipo.miembro5?.id
    ].includes(auth.user.id);

    // Verifica si todos los puestos del equipo están ocupados
    const equipoLleno = [
        equipo.miembro1,
        equipo.miembro2,
        equipo.miembro3,
        equipo.miembro4,
        equipo.miembro5
    ].every(miembro => miembro !== null && miembro !== undefined);

    const handleUnirseEquipo = () => {
        Inertia.post(route('equipos.unirse', equipo.id));
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                    <div className="p-6 bg-white border-b border-gray-200">
                        <h3 className="text-lg leading-6 font-medium text-gray-900">{equipo.nombre_equipo}</h3>
                        <ul>
                            <li><strong>Líder:</strong> {equipo.lider.name}</li>
                            <li><strong>Modo de Juego:</strong> {equipo.modo.nombre}</li>
                            <li><strong>Privacidad:</strong> {equipo.privado ? 'Privado' : 'Público'}</li>
                            <li><strong>Miembro 1:</strong> {equipo.miembro1 ? equipo.miembro1.name : 'No asignado'}</li>
                            <li><strong>Miembro 2:</strong> {equipo.miembro2 ? equipo.miembro2.name : 'No asignado'}</li>
                            <li><strong>Miembro 3:</strong> {equipo.miembro3 ? equipo.miembro3.name : 'No asignado'}</li>
                            <li><strong>Miembro 4:</strong> {equipo.miembro4 ? equipo.miembro4.name : 'No asignado'}</li>
                            <li><strong>Miembro 5:</strong> {equipo.miembro5 ? equipo.miembro5.name : 'No asignado'}</li>
                        </ul>
                        {/* Mostrar el botón solo si el equipo no está lleno y el usuario no es miembro */}
                        {!esMiembro && !equipoLleno && (
                            <Button onClick={handleUnirseEquipo}>
                                Unirse al Equipo
                            </Button>
                        )}<br></br>
                        <Link href={route('equipos.index')} className="text-indigo-600 hover:text-indigo-900">
                            Volver
                        </Link>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default EquipoShow;
