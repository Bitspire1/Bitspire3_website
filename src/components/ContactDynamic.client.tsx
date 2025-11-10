"use client";

import dynamic from "next/dynamic";
import React from "react";

// Dynamic import of the Contact component with ssr: false.
// Use this wrapper in Server Components when you previously used
// dynamic(() => import('./contact'), { ssr: false }) directly from a server file.
const ContactNoSSR = dynamic(() => import("./contact"), { ssr: false });

const ContactDynamic: React.FC = (props) => {
  return <ContactNoSSR {...props} />;
};

export default ContactDynamic;
