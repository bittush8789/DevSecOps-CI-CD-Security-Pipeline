"use client"
import { Shield, Lock, Zap, Server, Activity, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Dashboard() {
  const stats = [
    { name: 'Security Score', value: '98/100', icon: Shield, color: 'text-emerald-400' },
    { name: 'Vulnerabilities', value: '0 Critical', icon: Lock, color: 'text-indigo-400' },
    { name: 'Active Scans', value: '14 Today', icon: Zap, color: 'text-amber-400' },
    { name: 'Uptime', value: '99.99%', icon: Activity, color: 'text-blue-400' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
          Welcome to <span className="gradient-text">Security Command Center</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-3xl">
          Real-time monitoring of your DevSecOps pipeline. Integrated SAST, DAST, and SCA analysis for production workloads.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-card flex items-center space-x-4"
          >
            <div className={`p-3 rounded-xl bg-slate-800 ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">{stat.name}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Server className="w-5 h-5 text-indigo-500" /> System Health
          </h3>
          <div className="space-y-6">
            {['API Gateway', 'Auth Service', 'Product Database', 'K8s Cluster'].map((service) => (
              <div key={service} className="flex items-center justify-between">
                <span className="text-slate-300">{service}</span>
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Operational
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card border-amber-900/50 bg-amber-900/5">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-5 h-5" /> Recent Security Alerts
          </h3>
          <div className="space-y-4">
             <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
               <p className="text-sm font-medium">Minor Dependency Warning</p>
               <p className="text-xs text-slate-500 mt-1">Package 'axios' has a patch available (v1.6.3)</p>
             </div>
             <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800">
               <p className="text-sm font-medium">Unauthorized Login Attempt</p>
               <p className="text-xs text-slate-500 mt-1">Blocked IP: 192.168.1.45 (Rate limited)</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  )
}
