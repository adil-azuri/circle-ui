import { Card, CardHeader } from "../ui/card";

export function Follow() {

    return (
        <Card className="mb-6 p-3 rounded-lg">
            <CardHeader>
                <h3 className="text-lg font-bold mb-3 text-gray-300">Suggested for you</h3>
            </CardHeader>
            <ul className="space-y-2">
                {[
                    { name: "Mohammed Jawahir", username: "@em_jawahir", following: true },
                    { name: "Shakia Kimathi", username: "@shakiakim", following: false },
                ].map((user) => (
                    <li key={user.username} className="flex items-center justify-between bg-gray-800 p-3 rounded-md">
                        <div className="flex items-center">
                            <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                                <span className="text-white">{user.name.charAt(0)}</span>
                            </div>
                            <div className="ml-3">
                                <div className="font-semibold text-gray-300">{user.name}</div>
                                <div className="text-xs text-gray-500">{user.username}</div>
                            </div>
                        </div>
                        <button className={`rounded-full px-3 py-1 text-xs font-medium ${user.following ? 'bg-gray-700 hover:bg-gray-600' : 'bg-green-600 hover:bg-green-700'}`}>
                            {user.following ? 'Following' : 'Follow'}
                        </button>
                    </li>
                ))}
            </ul>
        </Card>
    );
}
