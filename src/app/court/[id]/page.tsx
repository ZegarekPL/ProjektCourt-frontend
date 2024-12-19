"use client"
import React from 'react';
import PageWrapper from "@/components/layout/PageWrapper";
import {useParams } from "next/navigation";
import Error404CourtPage from "@/app/court/[id]/not-found";

export interface Court {
    id: number;
    name: string;
    location: {
        locX: number;
        locY: number;
        name: string;
    };
    surfaceType: string;
    comments: string[];
    grades: number[];
    available: boolean;
}

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

export default function CourtDetailsPage() {
    const { id } = useParams();

    if (!id || Array.isArray(id)) {
        return <Error404CourtPage />;
    }

    const court = courtsData.find(c => c.id === parseInt(id));

    if (!court) {
        return <Error404CourtPage />;
    }

    const averageGrade = (grades: number[]) => {
        const total = grades.reduce((sum, grade) => sum + grade, 0);
        return (total / grades.length).toFixed(1);
    };

    return (
        <PageWrapper className="pt-20">
            <div className="mx-auto p-8 bg-mainWhite  shadow-xl rounded-lg max-w-3xl">
                <h1 className="text-4xl font-bold text-darkGray text-center mb-6">{court.name}</h1>

                <div className="flex flex-col md:flex-row justify-between items-start mb-8 p-6 bg-mainGreen text-white rounded-lg shadow-md">
                    <button className="flex flex-col mb-4 md:mb-0">
                        <p className="text-xl">Lokalizacja: <span className="font-semibold">{court.location.name}</span></p>
                        <p className="text-lg">Współrzędne: {court.location.locX}, {court.location.locY}</p>
                    </button>
                    <div>
                        <p className="text-xl">Typ nawierzchni: <span className="font-semibold">{court.surfaceType}</span></p>
                        <p className={`text-xl ${court.available ? 'text-green-400' : 'text-red-400'}`}>
                            {court.available ? 'Dostępny' : 'Niedostępny'}
                        </p>
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-darkGray">Ocena średnia:</h2>
                    <div className="flex items-center justify-start space-x-2 mb-4">
                        <span className="text-4xl text-darkGray font-bold">{averageGrade(court.grades)} / 5</span>
                        <span className="text-lg text-darkGray">({court.grades.length} ocen)</span>
                    </div>
                    <h3 className="text-xl font-semibold text-darkGray mb-2">Oceny użytkowników:</h3>
                    <ul className="list-disc pl-6 text-darkGray">
                        {court.grades.map((grade, index) => (
                            <li key={index} className="text-lg">Ocena {index + 1}: {grade} / 5</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-darkGray mb-2">Komentarze:</h3>
                    <ul className="list-inside text-darkGray">
                        {court.comments.map((comment, index) => (
                            <li key={index} className="text-lg mb-2">{comment}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </PageWrapper>
    );
}
