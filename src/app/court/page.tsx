"use client"
import React, { useState } from 'react';
import PageWrapper from "@/components/layout/PageWrapper";
import { useRouter } from 'next/navigation';
import {Court} from "@/app/court/[id]/page";

const courtsData: Court[] = [
    {
        id: 1,
        name: 'Kort 1',
        location: { locX: 52.2298, locY: 21.0118, name: 'Warszawa' },
        surfaceType: 'Tartan',
        comments: ['Doskonały kort!', 'Bardzo dobry stan'],
        grades: [4, 5, 4, 4, 5],
        available: true
    },
    {
        id: 2,
        name: 'Kort 2',
        location: { locX: 50.0647, locY: 19.9450, name: 'Kraków' },
        surfaceType: 'Trawa',
        comments: ['Zły stan nawierzchni'],
        grades: [2, 3, 3, 2, 3],
        available: false
    },
    {
        id: 3,
        name: 'Kort 3',
        location: { locX: 51.1079, locY: 17.0385, name: 'Wrocław' },
        surfaceType: 'Syntetyczna',
        comments: ['Super kort do gry', 'Wygodne miejsce'],
        grades: [5, 5, 4, 5, 5],
        available: true
    },
    {
        id: 4,
        name: 'Kort 4',
        location: { locX: 52.4064, locY: 16.9252, name: 'Poznań' },
        surfaceType: 'Beton',
        comments: ['Świetna lokalizacja', 'Dobre oświetlenie'],
        grades: [4, 4, 4, 4, 4],
        available: true
    },
    {
        id: 5,
        name: 'Kort 5',
        location: { locX: 54.3520, locY: 18.6466, name: 'Gdańsk' },
        surfaceType: 'Tartan',
        comments: ['Dostępny tylko w godzinach wieczornych'],
        grades: [3, 3, 3, 2, 4],
        available: false
    },
];

export default function CourtPage() {
    const [sortBy, setSortBy] = useState('name');
    const [filteredCourts, setFilteredCourts] = useState(courtsData);

    const router = useRouter();


    const sortCourts = (courts: Court[], criterion: string) => {
        return [...courts].sort((a, b) => {
            if (criterion === 'name') {
                return a.name.localeCompare(b.name);
            } else if (criterion === 'location') {
                return a.location.name.localeCompare(b.location.name);
            } else if (criterion === 'availability') {
                return a.available === b.available ? 0 : a.available ? -1 : 1;
            }
            return 0;
        });
    };

    const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortBy = event.target.value;
        setSortBy(newSortBy);
        setFilteredCourts(sortCourts(courtsData, newSortBy));
    };

    const calculateAverageGrade = (grades: number[]) => {
        const total = grades.reduce((acc, grade) => acc + grade, 0);
        return (total / grades.length).toFixed(1);
    };

    const goToCourtDetails = (courtId: number) => {
        router.push(`/court/${courtId}`);
    };

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
                        <option value="location">Lokalizacja</option>
                        <option value="availability">Dostępność</option>
                    </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredCourts.map((court) => (
                        <div
                            key={court.id}
                            className={`p-4 border rounded-lg shadow-md text-darkGray ${
                                court.available ? 'bg-green-100' : 'bg-red-100'
                            }`}
                            onClick={() => goToCourtDetails(court.id)}
                        >
                            <h2 className="text-xl font-semibold">{court.name}</h2>
                            <p className="text-darkGray">Lokalizacja: {court.location.name}</p>
                            <p className="text-darkGray">Typ nawierzchni: {court.surfaceType}</p>
                            <p className="text-sm text-darkGray">Ocena: {calculateAverageGrade(court.grades)} / 5</p>
                            <p className={`text-sm ${court.available ? 'text-green-600' : 'text-red-600'}`}>
                                {court.available ? 'Dostępny' : 'Niedostępny'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </PageWrapper>
    );
}
