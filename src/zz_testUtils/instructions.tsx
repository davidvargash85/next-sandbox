/* eslint-disable react/no-unescaped-entities */
import { AccountsTask } from "@/components/Accounts";
import { Numbers } from "@/components/CodeReview_old";
import { FetchTask } from "@/components/Fetch";
import { FormTask } from "@/components/Form";
import React, { ComponentType, ReactNode } from "react";

type Test = {
  Component: ComponentType;
  instructions: ReactNode;
};

export const tests: Record<string, Test> = {
  codeReview: {
    Component: Numbers,
    instructions: (
      <div className="space-y-4">
        <p>
          Open the CodeReview Component -
          <b>
            src/components/
            <wbr />
            CodeReview.tsx
          </b>
        </p>
        <p>It's is displayed on the right side.</p>
        <p>
          Take a look at the code as if you were reviewing it for a pull
          request. Tell us any feedback you'd give the author.
        </p>
      </div>
    ),
  },
  fetch: {
    Component: FetchTask,
    instructions: (
      <div className="space-y-4">
        <p>
          Open the Fetch Component -
          <b>
            src/components/
            <wbr />
            Fetch.tsx
          </b>
        </p>
        <p>It's is displayed on the right side.</p>
        <p>
          Your task is to fetch account data from the following endpoint:
          <wbr />
          <b>
            http://localhost:3000/
            <wbr />
            api/fetch
          </b>
        </p>
        <p>
          This will return some data on a fake bank account which we want you to
          display on the page in whatever format you'd like.
        </p>
      </div>
    ),
  },
  form: {
    Component: FormTask,
    instructions: (
      <div className="space-y-4">
        <p>
          Open the Form Component -
          <b>
            src/components/
            <wbr />
            Form.tsx
          </b>
        </p>
        <p>It's is displayed on the right side.</p>
        <p>
          Your task is to create a form that allows a user to input their name,
          email, and phone number.
        </p>
        <>
          You'll submit the form to the following endpoint: <wbr />
          <b>
            http://localhost:3000/
            <wbr />
            api/form
          </b>
        </>
        <p>The API accepts the following fields:</p>
        <ul className="ml-8">
          <li>name: string</li>
          <li>email: string</li>
          <li>phone: string</li>
        </ul>
        <p>
          You can check the API implementation in <b>src/pages/api/form.ts</b>{" "}
          if you'd like.
        </p>
        <p>
          When the form is submitted successfully, display the data in a list
          below the form.
        </p>
      </div>
    ),
  },
  accountsReact: {
    Component: AccountsTask,
    instructions: (
      <p>
        Check the{" "}
        <b>
          instructions/
          <wbr />
          Accounts.md
        </b>{" "}
        file for all the details.
      </p>
    ),
  },
};
