"use client";
import React from "react";
import { GenericBriefForm } from "./GenericBriefForm";
import { WEBSITE_BRIEF_STEPS } from "./schemas/websiteBriefSteps";

const WebsiteBrief: React.FC = () => {
	return (
		<GenericBriefForm 
			steps={WEBSITE_BRIEF_STEPS}
			formName="brief-website"
		/>
	);
};

export default WebsiteBrief;
