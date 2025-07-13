import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { fetchTasks, createTask, updateTask, deleteTask } from '../../api/listAPI';

export default function ListShow() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle ] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { id } = useParams();
  const [gitaQuote, setGitaQuote] = useState(null);

  
  useEffect(() => {
    const getTasks = async () => {
      const res = await fetchTasks(id);
      if (res.tasks) {
        setTasks(res.tasks);  
        setTitle(res.title);
      }
    };

    const fetchQuote = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/gitaquote'); // or your deployed backend URL
        const data = await res.json();
        setGitaQuote(data);
      } catch (err) {
        console.log("Failed to fetch Gita quote", err);
      }
    };

    getTasks();
    fetchQuote();
  }, []);


  const onSubmit = async (data) => {
    console.log(data.newTask)
    const res = await createTask(id, data.newTask);
    if (res.message) {
      reset(); 
      const updated = await fetchTasks(id);
      setTasks(updated.tasks || []);
    } else {
      console.log(res.error);
    }
  }

  // Toggle completed status
  const toggleTaskCompletion = async (index) => {
    const task = tasks[index];
    const res = await updateTask(id, index, { completed: !task.completed });
    if (res.list) {
      console.log(res.message);
      setTasks(res.list.tasks); 
    } else {
      console.log(res.error);
    }
  };

  return (
    <section className="relative top-24 min-h-screen flex flex-col items-center gap-6 px-5 sm:px-12 md:px-20 xl:px-32">
      {/* LIST-NAME TITLE */}
      <p className="text-4xl text-gradient md:text-5xl text-[#FF7601] hover:cursor-default font-cinzel">
        {title}
      </p>

      {/* GITA-QUOTE */}
      {gitaQuote && (
        <div className="text-center font-cinzel">
          <p className="text-lg sm:text-xl text-[#9D0208] italic">
            “{gitaQuote.eng}”
          </p>
          <p className="text-sm sm:text-base text-gray-700 mt-1">
            — Bhagavad Gita {gitaQuote.chapter}.{gitaQuote.verse} ({gitaQuote.author})
          </p>
        </div>
      )}

      {/* ADD NEW TASK FORM=============================================*/}
      <form
        className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 sm:gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="flex-1 px-5 py-2 border rounded-3xl border-none bg-white/40 focus:outline-[#FF7601] transition-all text-base sm:text-lg"
          type="text"
          {...register('newTask', { required: { value: true, message: "Please enter a Task first!"}})}
          id="newTask"
          placeholder="Enter New Task"
        />
        { errors.newTask && <p className='text-red-600'>{errors.newTask.message}</p> }

        <button
          type="submit"
          className="hero-button w-full sm:w-auto self-center sm:self-auto"
        >
          Add
        </button>
      </form>

      {/* DISPLAY TASKS ====================================================*/}
      <div className="tasks w-full">
        <ul className="w-full flex flex-col gap-1">
          {tasks.map((t, index) => (
            <li
              key={index}
              className="w-full bg-[#fff]/30 px-4 py-4 sm:px-8 sm:py-5 rounded-3xl shadow-lg flex items-center justify-between gap-4 text-base text-md sm:text-lg"
            >
              <div className="flex gap-2">
                {/* COMPLETED-CHECK */}
                <input
                  className="checkbox scale-150 accent-gray-500 hover:cursor-pointer peer outline-none focus:outline-none"
                  type="checkbox"
                  id={`checkbox-${index}`}
                  checked={t.completed}
                  onChange={() => toggleTaskCompletion(index)}
                />
                <label
                  htmlFor={`checkbox-${index}`}
                  className="peer-checked:line-through peer-checked:opacity-60 transition-all"
                >
                  {t.title}
                </label>
              </div>

              {/* DELETE-TASK */}
              <span
                className="material-symbols-outlined hover:cursor-pointer"
                onClick={async () => {
                  const res = await deleteTask(id, index);
                  if (res.list) {
                    console.log(res.message);
                    setTasks(res.list.tasks); 
                  } else {
                    console.log(res.error);
                  }
                }}
              >
                remove
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
