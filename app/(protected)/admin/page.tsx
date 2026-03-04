"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { useAuth } from "@/context/AuthContext";
import {
  Trash2,
  ShieldAlert,
  ShieldCheck,
  User as UserIcon,
} from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

export default function AdminPage() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [fetching, setFetching] = useState(true);

 

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setFetching(true);
      const res = await api.get("/admin/users");
      setUsers(res.data.filter((da: User) => da.id !== user?.id));
    } catch {
      toast.error("Failed to load users");
    } finally {
      setFetching(false);
    }
  };

  const promote = async (id: number) => {
    try {
      await api.put(`/admin/users/promote/${id}`);
      toast.success("User promoted to Moderator");
      fetchUsers();
    } catch {
      toast.error("Failed to promote");
    }
  };

  const demote = async (id: number) => {
    try {
      await api.put(`/admin/users/demote/${id}`);
      toast.success("User demoted");
      fetchUsers();
    } catch {
      toast.error("Failed to demote");
    }
  };

  const deleteUser = async (id: number) => {
    if (!confirm("Are you sure? This action cannot be undone.")) return;
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success("User deleted permanently");
      setUsers(users.filter((u) => u.id !== id));
    } catch {
      toast.error("Failed to delete");
    }
  };


  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-900 md:text-3xl">
              User Management
            </h1>
            <p className="mt-1 text-gray-500">
              Manage permissions and account status for all users.
            </p>
          </div>
          <div className="self-start rounded-lg bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700">
            Total Users: {users.length}
          </div>
        </header>

        <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:block">
          <table className="w-full border-collapse text-left">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="p-4 font-semibold text-gray-600">User</th>
                <th className="p-4 font-semibold text-gray-600">Role</th>
                <th className="p-4 text-right font-semibold text-black">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {fetching ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-gray-400">
                    Loading data...
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id} className="transition-colors hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-500">
                          <UserIcon size={20} />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{u.name}</p>
                          <p className="text-sm text-gray-500">{u.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-bold tracking-wider uppercase ${
                          u.role === "admin"
                            ? "bg-purple-100 text-purple-700"
                            : u.role === "moderator"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        {u.role === "user" && (
                          <button
                            onClick={() => promote(u.id)}
                            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                          >
                            <ShieldCheck size={16} /> Promote
                          </button>
                        )}
                        {u.role === "moderator" && (
                          <button
                            onClick={() => demote(u.id)}
                            className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-amber-600 transition hover:bg-amber-50"
                          >
                            <ShieldAlert size={16} /> Demote
                          </button>
                        )}
                        <button
                          onClick={() => deleteUser(u.id)}
                          className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
                        >
                          <Trash2 size={16} /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 gap-4 md:hidden">
          {users.map((u) => (
            <div
              key={u.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    <UserIcon size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{u.name}</h3>
                    <p className="text-sm text-gray-500">{u.email}</p>
                  </div>
                </div>
                <span className="rounded bg-gray-100 px-2 py-1 text-[10px] font-bold text-black uppercase">
                  {u.role}
                </span>
              </div>
              <div className="flex gap-2 border-t border-gray-100 pt-4">
                {u.role === "user" && (
                  <button
                    onClick={() => promote(u.id)}
                    className="flex-1 rounded-lg bg-blue-600 py-2 text-sm font-semibold text-white"
                  >
                    Promote
                  </button>
                )}
                {u.role === "moderator" && (
                  <button
                    onClick={() => demote(u.id)}
                    className="flex-1 rounded-lg bg-amber-500 py-2 text-sm font-semibold text-white"
                  >
                    Demote
                  </button>
                )}
                <button
                  onClick={() => deleteUser(u.id)}
                  className="flex-1 rounded-lg border border-red-200 py-2 text-sm font-semibold text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
