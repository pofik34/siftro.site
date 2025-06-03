'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Workflow {
  id: string;
  name: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  last_run?: string;
  target_website?: string;
  search_criteria?: string;
}

export default function PanelPage() {
  const router = useRouter();
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    targetWebsite: '',
    searchCriteria: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in and has paid plan
    const session = localStorage.getItem('session');
    if (!session) {
      router.push('/giris');
      return;
    }

    const sessionData = JSON.parse(session);
    if (!sessionData.hasPaidPlan) {
      router.push('/#pricing');
      return;
    }

    // Fetch workflows
    fetchWorkflows();
  }, [router]);

  const fetchWorkflows = async () => {
    try {
      const res = await fetch('/api/workflows');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch workflows');
      }

      setWorkflows(data.workflows);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch workflows');
    }
  };

  const handleCreateWorkflow = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/workflows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newWorkflow.name,
          targetWebsite: newWorkflow.targetWebsite,
          searchCriteria: newWorkflow.searchCriteria,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create workflow');
      }

      setWorkflows(prev => [...prev, data.workflow]);
      setIsModalOpen(false);
      setNewWorkflow({ name: '', targetWebsite: '', searchCriteria: '' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create workflow');
    } finally {
      setLoading(false);
    }
  };

  const handleRunWorkflow = async (workflowId: string) => {
    try {
      // Call the run endpoint
      const res = await fetch('/api/workflows/run', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ workflowId }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to run workflow');
      }

      // Update local state with the returned workflow
      setWorkflows(prev =>
        prev.map(w =>
          w.id === workflowId ? data.workflow : w
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to run workflow');
      
      // Update local state to error
      setWorkflows(prev =>
        prev.map(w =>
          w.id === workflowId ? { ...w, status: 'error' } : w
        )
      );
    }
  };

  const handleDeleteWorkflow = async (workflowId: string) => {
    if (!confirm('Bu iş akışını silmek istediğinize emin misiniz?')) {
      return;
    }

    try {
      const res = await fetch(`/api/workflows?id=${workflowId}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete workflow');
      }

      setWorkflows(prev => prev.filter(w => w.id !== workflowId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete workflow');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Kontrol Paneli</h1>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Create workflow button */}
        <div className="mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Yeni İş Akışı Oluştur
          </button>
        </div>

        {/* Workflows grid */}
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3">
          {workflows.map((workflow) => (
            <div
              key={workflow.id}
              className="bg-white rounded-lg shadow-md p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">
                  {workflow.name}
                </h3>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    workflow.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : workflow.status === 'running'
                      ? 'bg-yellow-100 text-yellow-800'
                      : workflow.status === 'error'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {workflow.status === 'completed'
                    ? 'Tamamlandı'
                    : workflow.status === 'running'
                    ? 'Çalışıyor'
                    : workflow.status === 'error'
                    ? 'Hata'
                    : 'Beklemede'}
                </span>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Hedef Site:</span>{' '}
                  {workflow.target_website}
                </p>
                <p className="text-sm text-gray-500">
                  <span className="font-medium">Arama Kriterleri:</span>{' '}
                  {workflow.search_criteria}
                </p>
                {workflow.last_run && (
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">Son Çalıştırma:</span>{' '}
                    {new Date(workflow.last_run).toLocaleString('tr-TR')}
                  </p>
                )}
              </div>

              <div className="pt-4 flex space-x-3">
                <button
                  onClick={() => handleRunWorkflow(workflow.id)}
                  disabled={workflow.status === 'running'}
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {workflow.status === 'running' ? 'Çalışıyor...' : 'Çalıştır'}
                </button>
                <button
                  onClick={() => {
                    // TODO: Implement download functionality
                    alert('Excel indirme özelliği yakında eklenecek');
                  }}
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Excel İndir
                </button>
                <button
                  onClick={() => handleDeleteWorkflow(workflow.id)}
                  className="inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create workflow modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Yeni İş Akışı Oluştur
            </h2>
            <form onSubmit={handleCreateWorkflow} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  İş Akışı Adı
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newWorkflow.name}
                  onChange={(e) =>
                    setNewWorkflow((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="targetWebsite"
                  className="block text-sm font-medium text-gray-700"
                >
                  Hedef Website
                </label>
                <input
                  type="text"
                  id="targetWebsite"
                  name="targetWebsite"
                  value={newWorkflow.targetWebsite}
                  onChange={(e) =>
                    setNewWorkflow((prev) => ({
                      ...prev,
                      targetWebsite: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="searchCriteria"
                  className="block text-sm font-medium text-gray-700"
                >
                  Arama Kriterleri
                </label>
                <input
                  type="text"
                  id="searchCriteria"
                  name="searchCriteria"
                  value={newWorkflow.searchCriteria}
                  onChange={(e) =>
                    setNewWorkflow((prev) => ({
                      ...prev,
                      searchCriteria: e.target.value,
                    }))
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="örn: e-ticaret, online satış"
                  required
                />
              </div>
              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {loading ? 'Oluşturuluyor...' : 'Oluştur'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 