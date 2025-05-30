import { useState } from "react";

export default function App() {
  const [page, setPage] = useState("login"); // login | assignRoles
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Simulated roles and users
  const mockRoles = [
    { name: "user", description: "Temel kullanıcı, sadece okuma yetkisi." },
    { name: "superuser", description: "Yazma ve okuma yetkisi var." },
    { name: "admin", description: "Tüm izinlere sahip yönetici." },
  ];

  const initialUsers = [
    { id: 1, name: "Ali Veli", role: "user" },
    { id: 2, name: "Zeynep Ak", role: "admin" },
    { id: 3, name: "Mehmet Demir", role: "superuser" },
    { id: 4, name: "Ayşe Karan", role: "user" },
    { id: 5, name: "Fatih Korkmaz", role: "superuser" },
    { id: 6, name: "Emre Yılmaz", role: "user" },
    { id: 7, name: "Selin Aydın", role: "admin" },
    { id: 8, name: "Caner Bayram", role: "user" },
    { id: 9, name: "Cemal Taş", role: "superuser" },
    { id: 10, name: "Begüm Öz", role: "user" },
  ];

  const [users, setUsers] = useState([...initialUsers]);
  const [editedUsers, setEditedUsers] = useState([...initialUsers]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  const itemsPerPage = 5;

  // Filtered users based on search term
  const filteredUsers = editedUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      setPage("assignRoles");
    } else {
      setError("Geçersiz kullanıcı adı veya şifre.");
    }
  };

  const handleRoleChange = (id, newRole) => {
    setEditedUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, role: newRole } : user))
    );
  };

  const handleAddUser = () => {
    const newUser = {
      id: Date.now(),
      name: `Yeni Kullanıcı ${editedUsers.length + 1}`,
      role: "user",
    };
    setEditedUsers([newUser, ...editedUsers]);
    showNotification("Yeni kullanıcı eklendi.");
  };

  const handleDeleteUser = (id) => {
    setEditedUsers((prev) => prev.filter((user) => user.id !== id));
    showNotification("Kullanıcı başarıyla silindi.");
  };

  const handleSaveToServer = () => {
    // Simulate API call
    setTimeout(() => {
      setUsers([...editedUsers]);
      showNotification("Değişiklikler başarıyla kaydedildi.", true);
    }, 500);
  };

  const showNotification = (message, success = false) => {
    setNotificationMessage(message);
    setShowSuccess(success);
    setTimeout(() => {
      setNotificationMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50 flex items-center justify-center p-6">
      {/* Notification Toast */}
      {notificationMessage && (
        <div
          className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg text-white font-medium transition-transform transform ${
              showSuccess ? "bg-green-500" : "bg-blue-500"
            }`}
        >
          {notificationMessage}
        </div>
      )}

      <div className="w-full max-w-4xl bg-white rounded-xl shadow-2xl overflow-hidden transition-all duration-300 transform hover:scale-[1.01]">
        {page === "login" && (
          <div className="p-8 space-y-6">
            <h2 className="text-3xl font-bold text-gray-800 text-center">Giriş Yap</h2>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Kullanıcı Adı</label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Şifre</label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                Giriş
              </button>
            </form>
          </div>
        )}

        {page === "assignRoles" && (
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-800">Rol Ataması Yap</h2>
              <button
                onClick={() => setPage("login")}
                className="text-sm text-indigo-600 hover:text-indigo-800 underline"
              >
                Çıkış Yap
              </button>
            </div>

            {/* Role Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
              {mockRoles.map((role) => (
                <div key={role.name} className="bg-gray-50 p-4 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-semibold text-gray-800 capitalize">{role.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                </div>
              ))}
            </div>

            {/* Search & Add User */}
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <input
                type="text"
                placeholder="Kullanıcı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg flex-grow"
              />
              <button
                onClick={handleAddUser}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                + Yeni Kullanıcı Ekle
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto mt-4">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Ad Soyad</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">Rol Seç</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">İşlem</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{user.name}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value)}
                          className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                        >
                          {mockRoles.map((role) => (
                            <option key={role.name} value={role.name}>
                              {role.name.charAt(0).toUpperCase() + role.name.slice(1)}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-800 font-medium"
                        >
                          Sil
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-4">
              <div>
                Sayfa {currentPage} / {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                >
                  Önceki
                </button>
                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded disabled:opacity-50"
                >
                  Sonraki
                </button>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={handleSaveToServer}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2v-7a2 2 0 012-2h5v5.586l-1.293-1.293z" />
                </svg>
                Değişiklikleri Kaydet
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
