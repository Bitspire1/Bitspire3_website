"use client";
import React from "react";
import { GenericBriefForm } from "./GenericBriefForm";
import { SHOP_BRIEF_STEPS } from "./schemas/shopBriefSteps";

const ShopBrief: React.FC = () => {
	return (
		<GenericBriefForm 
			steps={SHOP_BRIEF_STEPS}
			formName="brief-shop"
		/>
	);
};

export default ShopBrief;
