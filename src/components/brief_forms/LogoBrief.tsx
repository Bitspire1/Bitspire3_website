"use client";
import React from "react";
import { GenericBriefForm } from "./GenericBriefForm";
import { LOGO_BRIEF_STEPS } from "./schemas/logoBriefSteps";

const LogoBrief: React.FC = () => {
	return (
		<GenericBriefForm 
			steps={LOGO_BRIEF_STEPS}
			formName="brief-logo"
		/>
	);
};

export default LogoBrief;
