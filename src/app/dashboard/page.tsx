"use client";
import { useState, useEffect } from "react";
import PageWrapper from "@/components/layout/PageWrapper";
import { AddSurfaceType, SurfaceType } from "@/hooks/surfaceType/type";
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
    const [newSurfaceType, setNewSurfaceType] = useState<string>("");
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [editingCourt, setEditingCourt] = useState<Court | null>(null);

    useEffect(() => {
        fetchCourts();
        fetchSurfaceTypes();
        fetchUsers();
    }, []);

    const fetchCourts = async () => {
        const data = await getAllCourts();
        setCourts(data);
    };

    const fetchSurfaceTypes = async () => {
        const data = await getAllSurfaceType();
        setSurfaceTypes(data);
    };

    const fetchUsers = async () => {
        const data = await getAllUsers();
        setUsers(data);
    };

    const handleAddCourt = async () => {
        const result = await addCourt(newCourt);
        if (result) {
            fetchCourts();
            window.location.reload();
        }
    };

    const handleDeleteCourt = async (courtId: number) => {
        const result = await deleteCourtById(courtId);
        if (result) {
            fetchCourts();
            window.location.reload();
        }
    };

    const handleEditCourt = (court: Court) => {
        setEditingCourt(court);
        setNewCourt({
            name: court.name,
            localization: court.localization,
            surfaceType: court.surfaceType,
        });
    };

    const handleUpdateCourt = async (courtId: number) => {
        const updatedCourt = { ...newCourt, id: courtId };
        const result = await editCourtById(courtId, updatedCourt);
        if (result) {
            fetchCourts();
            setEditingCourt(null);
            window.location.reload();
        }
    };

    const handleAddSurfaceType = async () => {
        if (newSurfaceType.trim()) {
            const veryNewSurfaceType: AddSurfaceType = {
                surfaceType: newSurfaceType,
            };

            const result = await addSurfaceType(veryNewSurfaceType);
            if (result) {
                setNewSurfaceType("");
                fetchSurfaceTypes();
                window.location.reload();
            }
        }
    };

    const handleChangeUserRole = async () => {
        if (selectedUser && selectedRole !== null) {
            const result = await changeUserRole(selectedUser.id, selectedRole);
            if (result) {
                fetchUsers();
                window.location.reload();
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
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        if (editingCourt) {
                            handleUpdateCourt(editingCourt.id);
                        } else {
                            handleAddCourt();
                        }
                    }} className="mb-4">
                        <input
                            type="text"
                            value={newCourt.name}
                            onChange={(e) => setNewCourt({ ...newCourt, name: e.target.value })}
                            placeholder="Court Name"
                            className="p-2 border rounded text-darkGray"
                        />
                        <input
                            type="text"
                            value={newCourt.localization}
                            onChange={(e) => setNewCourt({ ...newCourt, localization: e.target.value })}
                            placeholder="Localization Name"
                            className="p-2 border rounded text-darkGray m-2"
                        />
                        <select
                            value={newCourt.surfaceType}
                            onChange={(e) => setNewCourt({ ...newCourt, surfaceType: e.target.value })}
                            className="p-2 border rounded m-2 text-darkGray"
                        >
                            {surfaceTypes.map((surface) => (
                                <option key={surface.id} value={surface.surfaceType}>
                                    {surface.surfaceType}
                                </option>
                            ))}
                        </select>
                        <button type="submit" className="p-2 bg-blue-500 text-white rounded ml-2">
                            {editingCourt ? "Update Court" : "Add Court"}
                        </button>
                    </form>

                    {/* Court Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {courts.map((court) => (
                            <div key={court.id}
                                 className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center">
                                <div className="text-lg text-darkGray mb-2">{court.name}</div>
                                <div className="text-md text-darkGray mb-2">{court.localization}</div>
                                <div className="text-sm text-darkGray mb-4">Typ: {court.surfaceType}</div>
                                <div className="flex space-x-2">
                                    <button
                                        onClick={() => handleDeleteCourt(court.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => handleEditCourt(court)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        Edit
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Surface Type Management */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Manage Surface Types</h2>
                    <div className="flex items-center mb-4">
                        <input
                            type="text"
                            value={newSurfaceType}
                            onChange={(e) => setNewSurfaceType(e.target.value)}
                            placeholder="New Surface Type"
                            className="p-2 border rounded text-darkGray"
                        />
                        <button
                            onClick={handleAddSurfaceType}
                            className="ml-2 p-2 bg-green-500 text-white rounded"
                        >
                            Add Surface Type
                        </button>
                    </div>

                    {/* Surface Type Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {surfaceTypes.map((surface) => (
                            <div key={surface.id} className="bg-gray-100 p-4 rounded-lg shadow-md flex flex-col items-center">
                                <div className="text-lg text-darkGray mb-2">{surface.surfaceType}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* User Role Management */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-2">Manage User Roles</h2>
                    <select
                        onChange={(e) => {
                            const userId = +e.target.value;
                            const foundUser = users.find((user) => user.id === userId);
                            setSelectedUser(foundUser || null);
                        }}
                        className="p-2 border rounded mb-2 text-darkGray"
                    >
                        <option value="">Select User</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                    <select
                        onChange={(e) => {
                            const selectedRole = e.target.value as keyof typeof Role;
                            setSelectedRole(Role[selectedRole]);
                        }}
                        className="p-2 border rounded m-2 text-darkGray"
                    >
                        <option value="">Select Role</option>
                        <option value="USER">User</option>
                        <option value="ADMIN">Admin</option>
                    </select>


                    <button
                        onClick={handleChangeUserRole}
                        className="p-2 bg-yellow-500 text-white rounded"
                    >
                        Change Role
                    </button>
                </div>
            </div>
        </PageWrapper>
    );
}
