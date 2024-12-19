import PageWrapper from "@/components/layout/PageWrapper";

export default function Home() {
    return (
        <PageWrapper>
            <section className="text-center py-28">
                <h1 className="text-4xl font-bold">Witamy w ProjektCourt</h1>
                <p className="text-lg mt-4">
                    Gdzie możesz znaleźć swój nowy, ulubiony kort.
                </p>
                <div className="mt-6">
                    <button className="bg-darkGray text-mainWhite px-6 py-2 rounded-md hover:bg-mainYellow hover:text-darkGray transition">
                        Zobacz korty
                    </button>
                </div>
            </section>

            <section className="bg-darkGray text-mainWhite py-10 w-full text-center">
                <h2 className="text-2xl font-bold">Dołącz do nas już dziś!</h2>
                <p className="text-lg mt-2">Załóż konto i zacznij korzystać z pełni funkcjonalności aplikacji ProjektCourt.</p>
                <div className="mt-6">
                    <button className="bg-mainGreen text-mainWhite px-6 py-2 rounded-md hover:bg-mainYellow hover:text-darkGray transition">
                        Zarejestruj się
                    </button>
                </div>
            </section>

            <section className="text-center py-10 px-10">
                <h2 className="text-2xl font-semibold text-center">Funkcjonalności</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
                    <Card title={"Znajdowanie Kortów"} description={"ProjektCourt to miejsce, gdzie znajdziesz swój nowy kort blisko ciebie."} />
                    <Card title={"Dodawanie Kortów"} description={"Administratorzy mogą dodawać nowe korty, aby zwiększyć dostępność."} />
                    <Card title={"Ocenianie Kortów"} description={"Zalogowani użytkownicy mogą oceniać korty, aby pomóc innym w wyborze."} />
                    <Card title={"Komentarze"} description={"Wszyscy użytkownicy mogą dodawać opinie o kortach."} />
                </div>
            </section>
        </PageWrapper>
    );
}

function Card({ title, description }: { title: string; description: string }) {
    return (
        <div className="bg-mainWhite shadow-md p-4 rounded-md border-2 border-darkGray">
            <h3 className="text-xl font-bold text-mainGreen">{title}</h3>
            <p className="text-darkGray mt-2">{description}</p>
        </div>
    );
}
