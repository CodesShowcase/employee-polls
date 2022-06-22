import { Routes, Route } from "react-router-dom";
import Dashboard from '../components/Poll/Dashboard';
import NewPoll from '../components/Poll/NewPoll';
import PollDetails from '../components/Poll/PollDetails';
import Leaderboard from '../components/Poll/Leaderboard';
import Login from '../components/Auth/Auth';
import NotFound from '../components/Nav/404';

export default function Router() {
    return (
    <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route exact path="/questions/:question_id" element={<PollDetails />} />
        <Route exact path="/add" element={<NewPoll />} />
        <Route exact path="/leaderboard" element={<Leaderboard />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
)}
