import React from "react";
import Quiz from "../components/Quiz.jsx";


export default function QuizPage({ translations, categories }){
return (
<Quiz translations={translations} categories={categories} />
);
}