"use client";

import React from 'react';
import { signIn } from "next-auth/react";

export function LoginPage({ providers }) {
  return (
    <div>
      {Object.values(providers).map((provider) => (
            <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
            </button>
            </div>
        ))}
    </div>
  );
}

