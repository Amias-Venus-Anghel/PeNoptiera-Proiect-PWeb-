import { UserRoleEnum } from "@infrastructure/apis/client";
import { useOwnUserHasRole } from "@infrastructure/hooks/useOwnUser";
import { AppIntlProvider } from "@presentation/components/ui/AppIntlProvider";
import { ToastNotifier } from "@presentation/components/ui/ToastNotifier";
import { HomePage } from "@presentation/pages/HomePage";
import { LoginPage } from "@presentation/pages/LoginPage";
import { OrdersPage } from "@presentation/pages/OrdersPage";
import { ProductsPage } from "@presentation/pages/ProductsPage";
import { UsersPage } from "@presentation/pages/UsersPage";
import { FeedBackPage } from "@presentation/pages/FeedBackPage";
import { Route, Routes } from "react-router-dom";
import { AppRoute } from "routes";
import { ProducerPage } from "@presentation/pages/ProducerPage";
import { RegisterPage } from "@presentation/pages/RegisterPage";
import { ContactPage } from "@presentation/pages/ContactPage";
import { ShoppingCartPage } from "@presentation/pages/ShoppingCartPage";
import { PlaceOrderPage } from "@presentation/pages/PlaceOrderPage";

export function App() {
  const isAdmin = useOwnUserHasRole(UserRoleEnum.Admin);
  const isProducer = useOwnUserHasRole(UserRoleEnum.Producer);

  return <AppIntlProvider> {/* AppIntlProvider provides the functions to search the text after the provides string ids. */}
      <ToastNotifier />
      {/* This adds the routes and route mappings on the various components. */}
      <Routes>
        <Route path={AppRoute.Index} element={<HomePage />} /> {/* Add a new route with a element as the page. */}
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route path={AppRoute.Products} element={<ProductsPage />} />
        <Route path={AppRoute.Register} element={<RegisterPage/>} />
        <Route path={AppRoute.Contact} element={<ContactPage/>} />
        <Route path={AppRoute.ShoppingCart} element={<ShoppingCartPage/>}/>
        <Route path={AppRoute.PlaceOrder} element={<PlaceOrderPage/>}/>
        {isAdmin && <Route path={AppRoute.Users} element={<UsersPage />} />} {/* If the user doesn't have the right role this route shouldn't be used. */}
        {isAdmin && <Route path={AppRoute.Orders} element={<OrdersPage />} />}
        {isAdmin && <Route path={AppRoute.Feedback} element={<FeedBackPage />} />}
        {(isAdmin || isProducer) && (<Route path={AppRoute.ProducerPanel} element={<ProducerPage/>}/>)}
        
      </Routes>
    </AppIntlProvider>
}
