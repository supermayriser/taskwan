import React, { useState } from "react";
import { DatePickerModal } from "react-native-paper-dates";
import { useFormikContext } from "formik";
import dayjs from "dayjs";

import RegularInput from "../common/RegularInput";
import ActionInput from "../common/ActionInput";
import CalendarIcon from "../../../assets/svg/smallCalendarIcon.svg";
import { ProfileEditState } from "../../screens/AppScreens/ProfileEditScreen";

const ProfileEditForm: React.FC = () => {
  const [open, setOpen] = useState(false);

  const { values, handleChange, handleBlur, touched, errors, setFieldValue } = useFormikContext<ProfileEditState>();

  const onDismissSingle = (): void => setOpen(false);

  const onDatePickerOpen = (): void => setOpen(true);

  const onConfirmSingle = ({ date }: any): void => {
    setOpen(false);
    setFieldValue("birthDate", date);
  };

  return <>
    <RegularInput
      value={ values.displayName }
      handleChange={ handleChange("displayName") }
      handleBlur={ handleBlur("displayName") }
      label="Name"
      touched={ touched.displayName }
      errorMessage={ errors.displayName }
      placeholder="Name"
    />

    <RegularInput
      value={ values.profession }
      handleChange={ handleChange("profession") }
      handleBlur={ handleBlur("profession") }
      label="Profession"
      touched={ touched.profession }
      errorMessage={ errors.profession }
      placeholder="Profession"
    />

    <ActionInput
      value={ dayjs(values.birthDate).format("MMM-D-YYYY") }
      onPress={ onDatePickerOpen }
      label="Date of Birth"
      icon={ <CalendarIcon /> }
    />

    <RegularInput
      value={ values.email }
      handleChange={ handleChange("email") }
      handleBlur={ handleBlur("email") }
      label="Email"
      touched={ touched.email }
      errorMessage={ errors.email }
      keyboardType="email-address"
      placeholder="Email"
      disabled
    />

    <DatePickerModal
      locale="en"
      mode="single"
      visible={ open }
      onDismiss={ onDismissSingle }
      date={ values.birthDate }
      onConfirm={ onConfirmSingle }
      // validRange={{
      //   startDate: new Date(2021, 1, 2),  // optional
      //   endDate: new Date(), // optional
      //   disabledDates: [new Date()] // optional
      // }}
      // onChange={} // same props as onConfirm but triggered without confirmed by user
      // saveLabel="Save" // optional
      // uppercase={false} // optional, default is true
      // label="Select date" // optional
      // animationType="slide" // optional, default is 'slide' on ios/android and 'none' on web
    />
  </>;
};

export default ProfileEditForm;
