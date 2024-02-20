import Homepage from "./pages/HomePage/HomePage";
import { Routes, Route } from "react-router-dom";
import Userlogin from "./pages/Login/Userlogin/Userlogin";
import LoginChoice from "./pages/Login/LoginChoice/LoginChoice";
import Lsplogin from "./pages/Login/Lsplogin/Lsplogin";
import Adminlogin from "./pages/Login/Adminlogin/Adminlogin";
import RegisterChoice from "./pages/Register/RegisterChoice/RegisterChoice";
import UserRegister from "./pages/Register/UserRegister/UserRegister";
import LspRegister from "./pages/Register/LspRegister/LspRegister";
import UserWelcome from "./pages/Welcome/UserWelcome/UserWelcome";
import Choice from "./pages/Choice/Choice";
import Unknown from "./pages/Choice/Unknown";
import Lsplist from "./pages/Lsplist/Lsplist";
import Lspdetails from "./pages/Lsplist/Lspdetails";
import LspWelcome from "./pages/Welcome/LspWelcome/LspWelcome";
import Newconnection from "./pages/Lsppage/Newconnection/Newconnection";
import Advocatedashboard from "./pages/Dashboard/Lspdashboard/Advocatedashboard";
import Notarydashboard from "./pages/Dashboard/Lspdashboard/Notarydashboard";
import Documentwriterdashboard from "./pages/Dashboard/Lspdashboard/Documentwriterdashboard";
import Mediatordashboard from "./pages/Dashboard/Lspdashboard/Mediatordashboard";
import Arbitratordashboard from "./pages/Dashboard/Lspdashboard/Arbitratordashboard";
import Userconnection from "./pages/Userpage/Userconnection/Userconnection";
import Payment from "./pages/Payment/Payment";
import Thankyou from "./components/Thankyou";
// import Chat from "./pages/Chat/Chat";
import SetAvatar from "./components/Realtimechat/SetAvatar";
import Admindashboard from "./pages/Dashboard/Admindashboard/Admindashboard";
import ComplainReceivedPage from "./pages/Dashboard/Admindashboard/ComplainReceivedPage";
import VerificationStatusPage from "./pages/Dashboard/Admindashboard/VerificationStatusPage";
import UsersPage from "./pages/Dashboard/Admindashboard/UsersPage";
import NotariesPage from "./pages/Dashboard/Admindashboard/NotariesPage";
import AdvocatePage from "./pages/Dashboard/Admindashboard/AdvocatePage";
import DocumentWritersPage from "./pages/Dashboard/Admindashboard/DocumentWritersPage";
import MediatorsPage from "./pages/Dashboard/Admindashboard/MediatorsPage";
import ArbitratorsPage from "./pages/Dashboard/Admindashboard/ArbitratorsPage";
import LegalServiceProviderPage from "./pages/Dashboard/Admindashboard/LegalServiceProviderPage";
import CasesPage from "./pages/Dashboard/Lspdashboard/CasesPage";
import LSPComplainReceivedPage from "./pages/Dashboard/Lspdashboard/ComplainReceivedPage";
import LDashboardPage from "./pages/Dashboard/Lspdashboard/DashboardPage";
import LSPProfilePage from "./pages/Dashboard/Lspdashboard/ProfilePage";
import ListofComplaintsPage from "./pages/Dashboard/Userdashboard/ListofComplaintsPage";
import CaseDetails from "./pages/CaseDetails/CaseDetails";
import Videocall from "./pages/Videocall/Videocall";
import SubmitComplaintsPage from "./pages/Dashboard/Userdashboard/SubmitComplaintsPage";
import Agentlogin from "./pages/Login/AgentLogin/Agentlogin";
import Agentdashboard from "./pages/Dashboard/Agentdashboard/Agentdashboard";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/login" element={<LoginChoice />} />
        <Route exact path="/userlogin" element={<Userlogin />} />
        <Route exact path="/lsplogin" element={<Lsplogin />} />
        <Route exact path="/agentlogin" element={<Agentlogin />} />
        <Route exact path="/adminlogin" element={<Adminlogin />} />
        <Route exact path="/register" element={<RegisterChoice />} />
        <Route exact path="/userregister" element={<UserRegister />} />
        <Route exact path="/lspregister" element={<LspRegister />} />
        <Route exact path="/userwelcome" element={<UserWelcome />} />
        <Route exact path="/lspwelcome" element={<LspWelcome />} />
        <Route exact path="/choice" element={<Choice />} />
        <Route exact path="/unknownchoice" element={<Unknown />} />
        <Route exact path="/lsplist/:role" element={<Lsplist />} />
        <Route exact path="/lspdetails/:id" element={<Lspdetails />} />
        <Route exact path="/lspnewconnection" element={<Newconnection />} />
        <Route exact path="/userconnection" element={<Userconnection />} />
        <Route exact path="/payment/:lspid/:payid" element={<Payment />} />
        <Route exact path="/thankyou/:lspid/:payid" element={<Thankyou />} />
        {/* <Route exact path="/chat/:id" element={<Chat />} /> */}
        <Route path="/setAvatar" element={<SetAvatar />} />
        <Route path="/casedetails/:caseid" element={<CaseDetails />} />
        <Route path="/videocall" element={<Videocall />} />
        <Route path="/agentdashboard" element={<Agentdashboard />} />
        <Route
          exact
          path="/lspwelcome/advocatedashboard"
          element={<Advocatedashboard />}
        />
        <Route
          exact
          path="/lspwelcome/notarydashboard"
          element={<Notarydashboard />}
        />
        <Route
          exact
          path="/lspwelcome/documentwriterdashboard"
          element={<Documentwriterdashboard />}
        />
        <Route
          exact
          path="/lspwelcome/mediatordashboard"
          element={<Mediatordashboard />}
        />
        <Route
          exact
          path="/lspwelcome/arbitratordashboard"
          element={<Arbitratordashboard />}
        />
        <Route exact path="/admindashboard" element={<Admindashboard />} />
        <Route
          exact
          path="/admindashboard/HomePage"
          element={<Admindashboard />}
        />
        <Route
          exact
          path="/admindashboard/ComplainReceivedPage"
          element={<ComplainReceivedPage />}
        />
        <Route
          exact
          path="/admindashboard/VerificationStatusPage"
          element={<VerificationStatusPage />}
        />
        <Route exact path="/admindashboard/UsersPage" element={<UsersPage />} />
        <Route
          exact
          path="/admindashboard/NotariesPage"
          element={<NotariesPage />}
        />
        <Route
          exact
          path="/admindashboard/AdvocatesPage"
          element={<AdvocatePage />}
        />

        <Route
          exact
          path="/admindashboard/DocumentWritersPage"
          element={<DocumentWritersPage />}
        />
        <Route
          exact
          path="/admindashboard/MediatorsPage"
          element={<MediatorsPage />}
        />
        <Route
          exact
          path="/admindashboard/ArbitratorsPage"
          element={<ArbitratorsPage />}
        />
        <Route
          exact
          path="/admindashboard/AlllspsPage"
          element={<LegalServiceProviderPage />}
        />
        <Route exact path="/LSPDashboard/HomePage" element={<LspWelcome />} />
        <Route exact path="/LSPDashboard/CasesPage" element={<CasesPage />} />
        <Route
          exact
          path="/LSPDashboard/Complain_RecievedPage"
          element={<LSPComplainReceivedPage />}
        />
        <Route
          exact
          path="/LSPDashboard/DashboardPage"
          element={<LDashboardPage />}
        />
        <Route
          exact
          path="/LSPDashboard/ProfilePage"
          element={<LSPProfilePage />}
        />
        <Route
          exact
          path="/UserDashboard/List_of_ComplaintsPage"
          element={<ListofComplaintsPage />}
        />
        <Route exact path="/UserDashboard/HomePage" element={<UserWelcome />} />
        <Route
          exact
          path="/UserDashboard/File_a_ComplaintPage"
          element={<SubmitComplaintsPage />}
        />
      </Routes>
    </div>
  );
};

export default App;
