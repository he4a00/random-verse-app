"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";

const VerseContainer = () => {
  const [surahNumber, setSurahNumber] = useState(1);
  const [verseNumber, setVerseNumber] = useState(1);
  const [answers, setAnswers] = useState<string[]>([]);
  const [correct, IsCorrect] = useState<boolean>();
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [score, setScore] = useState(0);

  const surahNamesInArabic = [
    "سُورَةُ ٱلْفَاتِحَةِ",
    "سُورَةُ ٱلْبَقَرَةِ",
    "سُورَةُ آلِ عِمْرَانَ",
    "سُورَةُ ٱلنِّسَاء",
    "سُورَةُ ٱلْمَائِدَةِ",
    "سُورَةُ ٱلْأَنْعَامِ",
    "سُورَةُ ٱلْأَعْرَافِ",
    "سُورَةُ ٱلْأَنْفَالِ",
    "سُورَةُ ٱلتَّوْبَةِ",
    "سُورَةُ يُونُسَ",
    "سُورَةُ هُودٍ",
    "سُورَةُ يُوسُفَ",
    "سُورَةُ ٱلرَّعْدِ",
    "سُورَةُ إِبْرَٰهِيمَ",
    "سُورَةُ ٱلْحِجْرِ",
    "سُورَةُ ٱلنَّحْلِ",
    "سُورَةُ ٱلْإِسْرَآءِ",
    "سُورَةُ ٱلْكَهْفِ",
    "سُورَةُ مَرْيَمَ",
    "سُورَةُ طه",
    "سُورَةُ ٱلْأَنْبِيَآءِ",
    "سُورَةُ ٱلْحَجِّ",
    "سُورَةُ ٱلْمُؤْمِنُونَ",
    "سُورَةُ ٱلنُّورِ",
    "سُورَةُ ٱلْفُرْقَانِ",
    "سُورَةُ ٱلشُّعَرَآءِ",
    "سُورَةُ ٱلنَّمْلِ",
    "سُورَةُ ٱلْقَصَصِ",
    "سُورَةُ ٱلْعَنكَبُوتِ",
    "سُورَةُ ٱلرُّومِ",
    "سُورَةُ لُقْمَانَ",
    "سُورَةُ ٱلسَّجْدَةِ",
    "سُورَةُ ٱلْأَحْزَابِ",
    "سُورَةُ سَبَإٍ",
    "سُورَةُ فَاطِرٍ",
    "سُورَةُ يس",
    "سُورَةُ ٱلصَّٰفَّٰتِ",
    "سُورَةُ ص",
    "سُورَةُ ٱلزُّمَرِ",
    "سُورَةُ غَافِرِ",
    "سُورَةُ فُصِّلَتْ",
    "سُورَةُ ٱلشُّورَىٰ",
    "سُورَةُ ٱلزُّخْرُفِ",
    "سُورَةُ ٱلدُّخَانِ",
    "سُورَةُ ٱلْجَاثِيَةِ",
    "سُورَةُ ٱلْأَحْقَافِ",
    "سُورَةُ مُحَمَّدٍ",
    "سُورَةُ ٱلْفَتْحِ",
    "سُورَةُ ٱلْحُجُرَاتِ",
    "سُورَةُ ق",
    "سُورَةُ ٱلذَّٰرِيَٰتِ",
    "سُورَةُ ٱلطُّورِ",
    "سُورَةُ ٱلنَّجْمِ",
    "سُورَةُ ٱلْقَمَرِ",
    "سُورَةُ ٱلرَّحْمَٰنِ",
    "سُورَةُ ٱلْوَاقِعَةِ",
    "سُورَةُ ٱلْحَدِيدِ",
    "سُورَةُ ٱلْمُجَادِلَةِ",
    "سُورَةُ ٱلْحَشْرِ",
    "سُورَةُ ٱلْمُمْتَحَنَةِ",
    "سُورَةُ ٱلصَّفِّ",
    "سُورَةُ ٱلْجُمُعَةِ",
    "سُورَةُ ٱلْمُنَافِقُونَ",
    "سُورَةُ ٱلتَّغَابُنِ",
    "سُورَةُ ٱلطَّلَاقِ",
    "سُورَةُ ٱلتَّحْرِيمِ",
    "سُورَةُ ٱلْمُلْكِ",
    "سُورَةُ ٱلْقَلَمِ",
    "سُورَةُ ٱلْحَاقَّةِ",
    "سُورَةُ ٱلْمَعَارِجِ",
    "سُورَةُ نُوحٍ",
    "سُورَةُ ٱلْجِنِّ",
    "سُورَةُ ٱلْمُزَّمِّلِ",
    "سُورَةُ ٱلْمُدَّثِّرِ",
    "سُورَةُ ٱلْقِيَامَةِ",
    "سُورَةُ ٱلْإِنسَانِ",
    "سُورَةُ ٱلْمُرْسَلَاتِ",
    "سُورَةُ ٱلنَّبَإِ",
    "سُورَةُ ٱلنَّازِعَاتِ",
    "سُورَةُ عَبَسَ",
    "سُورَةُ ٱلتَّكْوِيرِ",
    "سُورَةُ ٱلْإِنْفِطَارِ",
    "سُورَةُ ٱلْمُطَفِّفِينَ",
    "سُورَةُ ٱلْإِنْشِقَاقِ",
    "سُورَةُ ٱلْبُرُوجِ",
    "سُورَةُ ٱلطَّارِقِ",
    "سُورَةُ ٱلْأَعْلَىٰ",
    "سُورَةُ ٱلْغَاشِيَةِ",
    "سُورَةُ ٱلْفَجْرِ",
    "سُورَةُ ٱلْبَلَدِ",
    "سُورَةُ ٱلشَّمْسِ",
    "سُورَةُ ٱللَّيْلِ",
    "سُورَةُ ٱلضُّحَىٰ",
    "سُورَةُ ٱلشَّرْحِ",
    "سُورَةُ ٱلتِّينِ",
    "سُورَةُ ٱلْعَلَقِ",
    "سُورَةُ ٱلْقَدْرِ",
    "سُورَةُ ٱلْبَيِّنَةِ",
    "سُورَةُ ٱلزَّلْزَلَةِ",
    "سُورَةُ ٱلْعَادِيَاتِ",
    "سُورَةُ ٱلْقَارِعَةِ",
    "سُورَةُ ٱلتَّكَاثُرِ",
    "سُورَةُ ٱلْعَصْرِ",
    "سُورَةُ ٱلْهُمَزَةِ",
    "سُورَةُ ٱلْفِيلِ",
    "سُورَةُ قُرَيْشٍ",
    "سُورَةُ ٱلْمَاعُونِ",
    "سُورَةُ ٱلْكَوْثَرِ",
    "سُورَةُ ٱلْكَافِرُونَ",
    "سُورَةُ ٱلنَّصْرِ",
    "سُورَةُ ٱلْمَسَدِ",
    "سُورَةُ ٱلْإِخْلَاصِ",
    "سُورَةُ ٱلْفَلَقِ",
    "سُورَةُ ٱلنَّاسِ",
  ];

  const makeTheAnswers = (actualSurah: string) => {
    const randomSurahs: string[] = [];
    while (randomSurahs.length < 3) {
      const randomSurah =
        surahNamesInArabic[
          Math.floor(Math.random() * surahNamesInArabic.length)
        ];
      if (randomSurah !== actualSurah && !randomSurahs.includes(randomSurah)) {
        randomSurahs.push(randomSurah);
      }
    }

    const answersArray = [...randomSurahs, actualSurah];

    return answersArray.sort(() => Math.random() - 0.5);
  };

  const getRandomSurah = () => {
    setSelectedAnswer("");
    const randomSurahNumber = Math.floor(Math.random() * 114) + 1;
    setSurahNumber(randomSurahNumber);
  };

  const { data: surahData, isLoading: isSurahLoading } = useQuery({
    queryKey: ["surah", surahNumber],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.alquran.cloud/v1/surah/${surahNumber}`
      );
      return data.data;
    },
    enabled: !!surahNumber,
  });

  const { data: verseData, isLoading: isVerseLoading } = useQuery({
    queryKey: ["verse", surahNumber, verseNumber],
    queryFn: async () => {
      const randomVerse =
        Math.floor(Math.random() * surahData.ayahs.length) + 1;
      setVerseNumber(randomVerse);
      const { data } = await axios.get(
        `https://api.alquran.cloud/v1/ayah/${surahNumber}:${randomVerse}`
      );
      return data.data;
    },
    enabled: !!surahData,
  });

  useEffect(() => {
    if (surahData) {
      const actualSurahName = surahData.name;
      setAnswers(makeTheAnswers(actualSurahName));
    }
  }, [surahData]);

  const handleAnswer = (answer: string, actualSurahName: string) => {
    setSelectedAnswer(answer);
    if (answer === actualSurahName) {
      IsCorrect(true);
      setScore(score + 1);
    } else {
      IsCorrect(false);
      setScore(0);
    }
  };

  if (isSurahLoading || isVerseLoading) {
    return <div className="text-white">جار التحميل...</div>;
  }

  return (
    <div className="p-5 md:p-14 bg-black opacity-60 rounded-md">
      {verseData ? (
        <div className="container flex items-center justify-center flex-col">
          <div className=" max-h-[50vh]">
            <h1 className="font-bold text-white text-center leading-loose break-words md:text-2xl text-xl whitespace-pre-wrap">
              {verseData.text}
            </h1>
          </div>
          <div className="mt-5 grid md:grid-cols-4 grid-cols-1 gap-5">
            {answers.map((answer) => (
              <button
                key={answer}
                type="button"
                className={`py-2.5 font-semibold px-5 me-2 mb-2 text-lg focus:outline-none rounded-full border focus:z-10 focus:ring-4 
                  ${
                    selectedAnswer === answer
                      ? correct && answer === verseData?.surah?.name
                        ? "text-black font-semibold bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600 focus:ring-green-300"
                        : !correct && answer === selectedAnswer
                        ? "text-black font-semibold bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600 focus:ring-red-300"
                        : "text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                      : "text-gray-900 bg-white border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                  }`}
                onClick={() => handleAnswer(answer, verseData?.surah?.name)}
              >
                {answer}
              </button>
            ))}
          </div>
          <button
            type="button"
            className={`${
              selectedAnswer === "" ? "cursor-not-allowed" : ""
            } py-2.5 mt-5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700`}
            onClick={getRandomSurah}
            disabled={selectedAnswer === ""}
          >
            التالي
          </button>
          <h1 className="text-xl text-white font-semibold mt-5">
            عدد الاجابات الصحيحة : {score}
          </h1>
        </div>
      ) : (
        <div className="text-white">حدث خطأ في التحميل</div>
      )}
    </div>
  );
};

export default VerseContainer;
