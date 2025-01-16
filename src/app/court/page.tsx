"use client"
import React, { useState, useEffect } from 'react';
import PageWrapper from "@/components/layout/PageWrapper";
import { useRouter } from 'next/navigation';
import { Court } from "@/hooks/court/type";
import { getAllCourts } from "@/hooks/court/court";
import {calculateWeightedAverageRating} from "@/utils/court";

export default function CourtPage() {
    const [sortBy, setSortBy] = useState('name');
    const [filteredCourts, setFilteredCourts] = useState<Court[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const fetchCourts = async () => {
            const courts = await getAllCourts();
            console.log(courts);
            setFilteredCourts(courts);
            setLoading(false);
        };

        fetchCourts();
    }, []);

    const sortCourts = (courts: Court[], criterion: string) => {
        return [...courts].sort((a, b) => {
            if (criterion === 'name') {
                return a.name.localeCompare(b.name);
            } else if (criterion === 'localization') {
                return a.localization.localeCompare(b.localization);
            }
            return 0;
        });
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortBy = event.target.value;
        setSortBy(newSortBy);
        setFilteredCourts(sortCourts(filteredCourts, newSortBy));
    };

    const goToCourtDetails = (courtId: number) => {
        router.push(`/court/${courtId}`);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <PageWrapper>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-semibold mb-4">Dostępne Korty</h1>

                <div className="mb-4">
                    <label htmlFor="sortBy" className="mr-2">Sortuj po:</label>
                    <select
                        id="sortBy"
                        value={sortBy}
                        onChange={handleSortChange}
                        className="p-2 border rounded text-darkGray"
                    >
                        <option value="name">Nazwa</option>
                        <option value="localization">Lokalizacja</option>
                        <option value="surfaceType">Typ Nawierzchni</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredCourts.map((court: Court) => (
                        <div
                            key={court.id}
                            className={`p-4 border rounded-lg shadow-md text-darkGray bg-mainWhite`}
                            onClick={() => goToCourtDetails(court.id)}
                        >
                            <h2 className="text-xl font-semibold">{court.name}</h2>
                            <p className="text-darkGray">Lokalizacja: {court.localization}</p>
                            <p className="text-darkGray">Typ nawierzchni: {court.surfaceType}</p>
                            <p className="text-sm text-darkGray">
                                Ocena: {calculateWeightedAverageRating({
                                grade1: court.grades.grade1,
                                grade2: court.grades.grade2,
                                grade3: court.grades.grade3,
                                grade4: court.grades.grade4,
                                grade5: court.grades.grade5
                            }).toFixed(1)} / 5
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
}
