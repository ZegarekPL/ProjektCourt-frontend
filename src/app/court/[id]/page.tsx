"use client";
import React, { useEffect, useState } from 'react';
import PageWrapper from "@/components/layout/PageWrapper";
import { useParams } from "next/navigation";
import Error404CourtPage from "@/app/court/[id]/not-found";
import { Court } from "@/hooks/court/type";
import { getCourtById } from "@/hooks/court/court";
import { calculateWeightedSum } from "@/utils/court";
import { addGrade, editGrade } from "@/hooks/grade/grade";
import { NewGrade } from "@/hooks/grade/type";
import Modal from "@/components/layout/Modal";

export default function CourtDetailsPage() {
    const { id } = useParams();
    const [court, setCourt] = useState<Court | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [userGrade, setUserGrade] = useState<number | null>(null);
    const [newGrade, setNewGrade] = useState<number >(3);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [gradeError, setGradeError] = useState<string | null>(null); // Stan do przechowywania błędu

    useEffect(() => {
        if (!id || Array.isArray(id)) {
            setError("Invalid court ID");
            setLoading(false);
            return;
        }

        const fetchCourtData = async () => {
            try {
                const courtData = await getCourtById(Number(id));
                if (courtData) {
                    setCourt(courtData);
                } else {
                    setError("Court not found");
                }
            } catch (error) {
                console.error(error);
                setError("Failed to fetch court data");
            } finally {
                setLoading(false);
            }
        };

        fetchCourtData();
    }, [id]);

    const handleGradeSubmit = async () => {
        // Walidacja: sprawdź, czy ocena jest w zakresie od 1 do 5
        if (newGrade < 1 || newGrade > 5) {
            setGradeError("Ocena musi być w zakresie od 1 do 5.");
            return;
        }

        const grade: NewGrade = {
            grade: newGrade,
        };

        try {
            const response = await addGrade(1, Number(id), grade);

            if (response === "Failed") {
                console.error("failed to add grade");
                await editGrade(1, Number(id), grade);
            }
            setIsEditing(false);
            setUserGrade(newGrade);
            setIsModalOpen(false); // Zamykamy modal po zapisaniu oceny
            setGradeError(null); // Resetujemy błąd
        } catch (error) {
            console.error("Error submitting grade:", error);
        }
    };

    const handleGradeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value >= 1 && value <= 5) {
            setNewGrade(value);
            setGradeError(null); // Resetujemy błąd, jeśli wartość jest poprawna
        } else {
            setNewGrade(value);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !court) {
        return <Error404CourtPage />;
    }

    return (
        <PageWrapper className="pt-20">
            <div className="mx-auto p-8 bg-mainWhite shadow-xl rounded-lg max-w-3xl">
                <h1 className="text-4xl font-bold text-darkGray text-center mb-6">{court.name}</h1>

                <div className="flex flex-col md:flex-row justify-between items-start mb-8 p-6 bg-mainGreen text-white rounded-lg shadow-md">
                    <button className="flex flex-col mb-4 md:mb-0">
                        <p className="text-xl">Lokalizacja: <span className="font-semibold">{court.localization}</span></p>
                    </button>
                    <div>
                        <p className="text-xl">Typ nawierzchni: <span className="font-semibold">{court.surfaceType}</span></p>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-darkGray">Ocena średnia:</h2>
                    <div className="flex items-center justify-start space-x-2 mb-4">
                        <span className="text-4xl text-darkGray font-bold">{calculateWeightedSum(court.grades)} / 5</span>
                        <span className="text-lg text-darkGray">(na {calculateWeightedSum(court.grades)} ocen(y))</span>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-darkGray mb-2">Komentarze:</h3>
                    <ul className="list-inside text-darkGray">
                        {court.comments.map((comment, index) => (
                            <li key={index} className="text-lg mb-2">{comment}</li>
                        ))}
                    </ul>
                </div>

                {/* Ocena użytkownika */}
                <div className="mt-8">
                    <h3 className="text-xl font-semibold text-darkGray mb-4">Twoja ocena:</h3>
                    {userGrade !== null ? (
                        <div>
                            <p className="text-xl">Twoja ocena: {userGrade} / 5</p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="mt-2 p-2 bg-mainGreen text-white rounded"
                            >
                                Edytuj ocenę
                            </button>
                        </div>
                    ) : (
                        <div>
                            <p className="text-xl">Nie oceniłeś jeszcze tego kortu.</p>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="mt-2 p-2 bg-mainGreen text-white rounded"
                            >
                                Oceń teraz
                            </button>
                        </div>
                    )}
                </div>

                {/* Modal z formularzem oceny */}
                {isModalOpen && (
                    <Modal onClose={() => setIsModalOpen(false)}>
                        <div className="p-6 bg-white rounded-lg shadow-xl">
                            <h2 className="text-2xl font-semibold text-darkGray mb-4">Twoja ocena</h2>
                            <input
                                type="number"
                                value={newGrade}
                                onChange={handleGradeChange}
                                min={1}
                                max={5}
                                className="border p-2 rounded mb-4 w-full text-darkGray"
                            />
                            {gradeError && (
                                <p className="text-red-500 text-sm">{gradeError}</p>
                            )}
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 bg-gray-400 text-white rounded"
                                >
                                    Anuluj
                                </button>
                                <button
                                    onClick={handleGradeSubmit}
                                    className="p-2 bg-mainGreen text-white rounded"
                                >
                                    Zapisz ocenę
                                </button>
                            </div>
                        </div>
                    </Modal>
                )}
            </div>
        </PageWrapper>
    );
}
