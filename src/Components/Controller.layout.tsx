import { all } from "axios";
import { Controller } from "react-hook-form";

interface FormField {
  name: string;
  label: string;
}

interface FormList {
  // step1: FormField[];
  // step2: FormField[];

  [key: string]: FormField[];
}

const formList: FormList = [
  {
    step1: [
      {
        name: "Name",
        label: "Name",
      },
      {
        name: "Age",
        label: "Date of Birth Or Age",
      },
      {
        name: "Sex",
        label: "Sex",
      },
      {
        name: "Mobile",
        label: "Mobile",
      },
      {
        name: "GovtId",
        label: "Id Type",
      },
      {
        name: "Govtype",
        label: "Enter Govt Id",
      },
    ],
    step2: [
      {
        name: "Address",
        label: "Address",
      },

      {
        name: "State",
        label: "State",
      },

      {
        name: "City",
        label: "City",
      },

      {
        name: "Country",
        label: "Country",
      },
      {
        name: "Pincode",
        label: "Pincode",
      },
    ],
  },
];

const ControllerLayout: React.FC = () => {
  return (
    <>
      <h2>hello</h2>
      {formList.map((item, index) => {})}
    </>
  );
};

export default ControllerLayout;
