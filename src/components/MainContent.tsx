function SidebarCenter() {

    return (
        <div className=" text-white w-1/2 p-5 rounded-lg shadow-lg">
            <h1 className="text-3xl mb-4 font-bold">Home</h1>
            <div className="mb-4 border-b border-gray-700 pb-3">
                <textarea
                    className="w-full bg-gray-800 text-white p-2 rounded-lg"
                    placeholder="Post something..."
                ></textarea>
                <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-lg">Post</button>
            </div>
            <div className="mb-4 bg-gray-800 p-3 rounded-lg">
                <div className="font-semibold">Indah Pra Karya @indahpra</div>
                <p>Kalian pernah gais bht on saving?</p>
                <div className="text-gray-400">36 Replies 4h</div>
            </div>
            <div className="mb-4 bg-gray-800 p-3 rounded-lg">
                <div className="font-semibold">Mona @monarizqa</div>
                <p>Pernah nggak dapet dream job</p>
                <div className="text-gray-400">293 Replies 1h</div>
            </div>

        </div>
    );
}

export default SidebarCenter;
