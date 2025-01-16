"use client";
import { useState, useEffect } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import { SurfaceType } from "@/hooks/surfaceType/type";
import { Role, User } from "@/hooks/user/type";
import { Court, NewCourt } from "@/hooks/court/type";
import { addCourt, deleteCourtById, editCourtById, getAllCourts } from "@/hooks/court/court";
import { addSurfaceType, getAllSurfaceType } from "@/hooks/surfaceType/surfaceType";
import { changeUserRole, getAllUsers } from "@/hooks/user/user";

export default function CourtPage() {
    const [courts, setCourts] = useState<Court[]>([]);
    const [surfaceTypes, setSurfaceTypes] = useState<SurfaceType[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [newCourt, setNewCourt] = useState<NewCourt>({ name: "", localization: "", surfaceType: "" });
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        // Fetch all courts, surface types, and users
        fetchCourts();
        fetchSurfaceTypes();
        fetchUsers();
    }, []);

    const fetchCourts = async () => {
        // Fetch the list of courts from the API
        const data = await getAllCourts();
        setCourts(data);
    };

    const fetchSurfaceTypes = async () => {
        // Fetch the surface types from the API
        const data = await getAllSurfaceType();
        setSurfaceTypes(data);
    };

    const fetchUsers = async () => {
        // Fetch the list of users from the API
        const data = await getAllUsers();
        setUsers(data);
    };

    const handleAddCourt = async () => {
        // Add a new court
        const result = await addCourt(newCourt);
        if (result) {
            fetchCourts();
        }
    };

    const handleDeleteCourt = async (courtId: number) => {
        // Delete a court by ID
        const result = await deleteCourtById(courtId);
        if (result) {
            fetchCourts();
        }
    };

    const handleEditCourt = async (courtId: number) => {
        // Edit a court by ID
        const result = await editCourtById(courtId);
        if (result) {
            fetchCourts();
        }
    };

    const handleAddSurfaceType = async (surfaceType: SurfaceType) => {
        // Add a new surface type
        const result = await addSurfaceType(surfaceType);
        if (result) {
            fetchSurfaceTypes();
        }
    };

    const handleChangeUserRole = async () => {
        if (selectedUser && selectedRole !== null) {
            const result = await changeUserRole(selectedUser.id, selectedRole);
            if (result) {
                fetchUsers();
            }
        }
    };

    return (
        <PageWrapper>
            <div className="container mx-auto p-4">
                <h1 className="text-xl font-bold mb-4">Court Dashboard</h1>

                {/* Court Management */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Manage Courts</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleAddCourt(); }} className="mb-4">
                        <input
                            type="text"
                            value={newCourt.name}
                            onChange={(e) => setNewCourt({ ...newCourt, name: e.target.value })}
                            placeholder="Court Name"
                            className="p-2 border rounded text-darkGray"
                        />
                        <select
                            value={newCourt.surfaceType}
                            onChange={(e) => setNewCourt({ ...newCourt, surfaceType: e.target.value })}
                            className="p-2 border rounded ml-2 text-darkGray"
                        >
                            {surfaceTypes.map((surface) => (
                                <option key={surface.id} value={surface.surfaceType}>
                                    {surface.surfaceType}
                                </option>
                            ))}
                        </select>
                        <button type="submit" className="p-2 bg-blue-500 text-white rounded ml-2">
                            Add Court
                        </button>
                    </form>

                    <ul>
                        {courts.map((court) => (
                            <li key={court.id} className="mb-2">
                                <div className="bg-darkGray ">

                                {court.name} - {court.surfaceType}
                                <button
                                    onClick={() => handleDeleteCourt(court.id)}
                                    className="ml-2 text-red-500"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleEditCourt(court.id)}
                                    className="ml-2 text-blue-500"
                                >
                                    Edit
                                </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Surface Type Management */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Manage Surface Types</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleAddSurfaceType({ surfaceType: "New Surface" }); }}>
                        <button type="submit" className="p-2 bg-green-500 text-white rounded">
                            Add Surface Type
                        </button>
                    </form>
                    <ul>
                        {surfaceTypes.map((surface) => (
                            <li key={surface.id} className="mb-2">
                                {surface.surfaceType}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* User Role Management */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Manage User Roles</h2>
                    <select
                        onChange={(e) => setSelectedUser(users.find((user) => user.id === +e.target.value))}
                        className="p-2 border rounded"
                    >
                        <option value="">Select User</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={(e) => setSelectedRole(e.target.value as Role)}
                        className="p-2 border rounded ml-2"
                    >
                        <option value="">Select Role</option>
                        <option value={Role.ADMIN}>Admin</option>
                        <option value={Role.USER}>User</option>
                    </select>
                    <button
                        onClick={handleChangeUserRole}
                        className="p-2 bg-yellow-500 text-white rounded ml-2"
                    >
                        Change Role
                    </button>
                </div>
            </div>
        </PageWrapper>
    );
}
