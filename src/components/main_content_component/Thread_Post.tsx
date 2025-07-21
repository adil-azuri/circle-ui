import avatar from "../../assets/avatar.png";

export function Thread_Post() {
    return (
        <div className="flex mb-4 border-b border-gray-600 pb-3 space-x-3">
            <img
                src={avatar}
                alt="User profile"
                className="w-10 h-10 object-cover rounded-full"
            />
            <form action="" className="flex w-full space-x-3">
                <input
                    id="post"
                    type="text"
                    className="w-full text-white p-2 rounded-lg"
                    placeholder="What is happening?!"
                    required
                />
                <label className="flex items-center">
                    <input type="file" className="hidden" />
                    <svg className="items-center h-5 w-5 text-3xl"
                        viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                        <g fill="none" fillRule="evenodd">
                            <path d="m0 0h32v32h-32z"></path>
                            <path d="m24 2c4.418278 0 8 3.581722 8 8v12c0 4.418278-3.581722 8-8 8h-16c-4.418278 0-8-3.581722-8-8v-12c0-4.418278 3.581722-8 8-8zm-15.15704017 11.3933983-6.84295983 6.8426017v1.764c0 3.2383969 2.56557489 5.8775718 5.77506174 5.9958615l.22493826.0041385h15.45zm21.15704017-1.8643983-10.096 10.097 6.048224 6.0492469c2.2878684-.7868384 3.9503124-2.9181728 4.0436375-5.4503086l.0041385-.2249383zm-6-7.529h-16c-3.23839694 0-5.87757176 2.56557489-5.99586153 5.77506174l-.00413847.22493826v7.407l5.42874627-5.4278153c.74554637-.7455464 1.93326028-.7794348 2.71900373-.1016654l.1094234.1016654 8.2318266 8.2318153 11.3946671-11.39268045c-.5346164-2.67667729-2.8501212-4.71066623-5.6587288-4.81418108zm-5.4 2c2.209139 0 4 1.790861 4 4s-1.790861 4-4 4-4-1.790861-4-4 1.790861-4 4-4zm0 2c-1.1045695 0-2 .8954305-2 2s.8954305 2 2 2 2-.8954305 2-2-.8954305-2-2-2z" fill="#53971c" fillRule="nonzero"></path>
                        </g>
                    </svg>
                </label>

                <button
                    type="submit"
                    className="mt-2 bg-green-700 text-white px-5 py-1 rounded-full"
                >
                    Post
                </button>
            </form>
        </div>
    );
}
