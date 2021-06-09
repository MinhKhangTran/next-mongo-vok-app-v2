import { IVok } from "@/interfaces/Vok";
import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { mutate } from "swr";

const VokForm = ({ vok }: { vok?: IVok }) => {
  const { user } = useUser();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      koreanisch: vok ? vok.koreanisch : "",
      deutsch: vok ? vok.deutsch : "",
    },
  });

  const createVok = async (data: IVok) => {
    const { koreanisch, deutsch } = data;
    const userId = user?.sub;
    try {
      const { data } = await axios.post("http://localhost:3000/api/voks", {
        koreanisch,
        deutsch,
        userId,
      });
      //   console.log(data);

      if (data) {
        router.push("/");
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateVok = async (data: IVok) => {
    const { koreanisch, deutsch } = data;
    const userId = user?.sub;
    try {
      const { data } = await axios.put(
        `http://localhost:3000/api/voks/${vok?._id}`,
        {
          koreanisch,
          deutsch,
          userId,
        }
      );
      //   console.log(data);

      if (data) {
        mutate(`/api/voks/${vok?._id}`);
        router.push("/");
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <StyledForm onSubmit={handleSubmit(vok ? updateVok : createVok)}>
      <div className="form-control">
        <label htmlFor="korean">Koreanisch</label>
        <input
          id="korean"
          type="text"
          placeholder="Koreanisch"
          {...register("koreanisch", { required: "Pflichtfeld" })}
        />
        {errors.koreanisch && <p>{errors.koreanisch.message}</p>}
      </div>
      <div className="form-control">
        <label htmlFor="german">Deutsch</label>
        <input
          id="german"
          type="text"
          placeholder="Deutsch"
          {...register("deutsch", { required: "Pflichtfeld" })}
        />
        {errors.deutsch && <p>{errors.deutsch.message}</p>}
      </div>
      <button disabled={isSubmitting} type="submit" className="btn">
        {vok ? "Ändern" : "Hinzufügen"}
      </button>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  width: 90%;
  max-width: 768px;
  margin: 2rem auto;
  .form-control {
    display: flex;
    flex-direction: column;
  }
  p {
    margin-top: 0.25rem;
    margin-bottom: 0.15rem;
    color: var(--red-dark);
  }
  label {
    color: var(--primary-400);
    font-size: 1.25rem;
  }
  input {
    padding: 5px 10px;
    border-radius: 50px;
    border: 2px solid var(--primary-400);
    color: var(--primary-400);
    font-size: 1.15rem;
  }
  .btn {
    padding: 0.25rem 1.25rem;
    border-radius: 4px;
    border: none;
    font-size: 1.3rem;
    margin-top: 1rem;
    background-color: var(--primary-400);
    transition: all 0.5s;
    color: var(--primary-50);
    cursor: pointer;
    &:hover {
      background-color: var(--primary-500);
    }
  }
`;

export default VokForm;
