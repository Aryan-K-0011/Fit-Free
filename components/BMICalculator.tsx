import React, { useState } from 'react';
import Button from './Button';
import { Calculator } from 'lucide-react';

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [status, setStatus] = useState('');

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    if (height && weight) {
      const heightInMeters = parseFloat(height) / 100;
      const weightInKg = parseFloat(weight);
      const bmiValue = weightInKg / (heightInMeters * heightInMeters);
      setBmi(parseFloat(bmiValue.toFixed(1)));

      if (bmiValue < 18.5) setStatus('Underweight');
      else if (bmiValue < 24.9) setStatus('Normal Weight');
      else if (bmiValue < 29.9) setStatus('Overweight');
      else setStatus('Obese');
    }
  };

  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 p-8 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-5">
            <Calculator className="w-32 h-32 text-white" />
        </div>
      <div className="relative z-10">
          <h2 className="text-2xl font-black text-white uppercase italic mb-2">BMI Calculator</h2>
          <p className="text-slate-400 mb-6">Check your body mass index to calculate your ideal weight range.</p>
          
          <form onSubmit={calculateBMI} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Height (cm)</label>
                <input 
                  type="number" 
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="175"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder-slate-600"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Weight (kg)</label>
                <input 
                  type="number" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="70"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all placeholder-slate-600"
                  required
                />
              </div>
            </div>
            <Button type="submit" className="w-full mt-2" variant="primary">Calculate</Button>
          </form>

          {bmi !== null && (
            <div className="mt-6 p-4 bg-slate-800/50 rounded-xl border border-slate-700 text-center animate-fade-in">
              <span className="block text-slate-400 text-sm uppercase font-bold">Your BMI</span>
              <span className="block text-4xl font-black text-orange-500 my-1">{bmi}</span>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${
                status === 'Normal Weight' ? 'bg-green-900/50 text-green-400' : 'bg-orange-900/50 text-orange-400'
              }`}>
                {status}
              </span>
            </div>
          )}
      </div>
    </div>
  );
};

export default BMICalculator;