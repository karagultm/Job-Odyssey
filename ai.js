```jsx
import React from 'react';

const CARD_CONTAINER_CLASS = "bg-white dark:bg-zinc-700 shadow-lg rounded-lg overflow-hidden";
const BUTTON_CLASS = "text-xs hover:underline";
const TEXT_CLASS = "text-zinc-600 dark:text-zinc-300";
const TITLE_CLASS = "text-lg font-semibold text-zinc-800 dark:text-white";

const JobCard = ({ imageSrc, altText, title, description, category1, category2 }) => {
    return (
        <div className={CARD_CONTAINER_CLASS}>
            <img src={imageSrc} alt={altText} className="w-full h-32 sm:h-48 object-cover" />
            <div className="p-4">
                <h2 className={TITLE_CLASS}>{title}</h2>
                <p className={TEXT_CLASS + " mt-2"}>{description}</p>
                <div className="flex items-center mt-4">
                    <button className={BUTTON_CLASS + " text-indigo-600 dark:text-indigo-400"}>{category1}</button>
                    <button className={BUTTON_CLASS + " ml-auto text-zinc-600 dark:text-zinc-400"}>{category2}</button>
                </div>
            </div>
        </div>
    );
};

const JobList = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center text-zinc-800 dark:text-white mb-6">Tüm İlanlar</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <JobCard
                    imageSrc="https://placehold.co/300x200"
                    altText="Everest Yolculuğu"
                    title="Everest Yolculuğu'na Çıkmaya Hazır mısın?"
                    description="2023 yılında, kişisel gelişim ve kariyer planlaması..."
                    category1="Maasli"
                    category2="Genel"
                />
                <JobCard
                    imageSrc="https://placehold.co/300x200"
                    altText="İnsan Kaynakları Stajyeri"
                    title="İnsan Kaynakları Stajyeri"
                    description="Potansiyelinizi keşfedin ve kariyerinizi şekillendirin..."
                    category1="Maasli"
                    category2="İnsan Kaynakları"
                />
                <JobCard
                    imageSrc="https://placehold.co/300x200"
                    altText="E-Ticaret Uzun Dönem Staj Programı"
                    title="E-Ticaret Uzun Dönem Staj Programı"
                    description="E-ticaret sektöründe kariyer yapma fırsatı..."
                    category1="E-Ticaret"
                    category2="Perakende"
                />
            </div>
        </div>
    );
};

const JobListPage = () => {
    return (
        <div className="bg-zinc-100 dark:bg-zinc-800">
            <JobList />
        </div>
    );
};

export default JobListPage;
```