import { inputClass, submitClass } from "@/utils/dinamicClass"

function registerPage() {
  return (
    <form>
      <fieldset className="space-y-4">
        <legend className="text-center font-bold text-xl">Register</legend>
        <input
          className={inputClass}
          type="text"
          placeholder="Andres Eduardo"
        />
        <input
          className={inputClass}
          type="text"
          placeholder="Rosas Alpiri"
        />
        <input
          className={inputClass}
          type="email"
          placeholder="alpiryk@gmail.com"
        />
        <input
          className={inputClass}
          type="password"
          placeholder="********"
        />
      </fieldset>
      <button type="submit" className={`${submitClass} mt-4`}>Regiter</button>
    </form>
  )
}

export default registerPage