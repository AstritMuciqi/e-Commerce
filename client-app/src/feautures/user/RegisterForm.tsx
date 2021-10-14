import { FORM_ERROR } from "final-form";
import { values } from "mobx";
import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { combineValidators, isRequired } from "revalidate";
import {
  Button,
  Container,
  Form,
  Header,
  Label,
  Segment,
} from "semantic-ui-react";
import { ErrorMessage } from "../../app/common/form/ErrorMessage";
import TextInput from "../../app/common/form/TextInput";
import { IUserFormValues } from "../../app/models/user";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";

const validate = combineValidators({
  username: isRequired("username"),
  displayName: isRequired("display name"),
  email: isRequired("email"),
  password: isRequired("password"),
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        form,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit,
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Sign up to Smart Store"
            color="teal"
            textAlign="center"
          />
          <Field name="username" component={TextInput} placeholder="Username" />
          <Field
            name="displayName"
            component={TextInput}
            placeholder="Dispaly Name"
          />
          <Field name="email" component={TextInput} placeholder="Email" />
          <Field
            name="password"
            component={TextInput}
            placeholder="Password"
            type="password"
          />

          <h5>
            You have an account?{" "}
            <h4
              style={{ display: "inline-block", color: "blue" }}
              onClick={() => openModal(<LoginForm />)}
            >
              {" "}
              Login
            </h4>
          </h5>
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} />
          )}

          <Button
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="teal"
            content="Register"
            fluid
          />
        </Form>
      )}
    />
  );
};

export default RegisterForm;
