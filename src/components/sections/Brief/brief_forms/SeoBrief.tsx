"use client";
import React from "react";
import { GenericBriefForm } from "./GenericBriefForm";
import { SEO_BRIEF_STEPS } from "./schemas/seoBriefSteps";

const SeoBrief: React.FC = () => {
	return (
		<GenericBriefForm 
			steps={SEO_BRIEF_STEPS}
			formName="brief-seo"
		/>
	);
};

export default SeoBrief;
