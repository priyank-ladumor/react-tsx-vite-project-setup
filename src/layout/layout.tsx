import { ReactNode } from 'react';
import { paths } from 'src/routes/paths';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="layout">
            {![paths.home.root, paths.form.root].includes(window.location.pathname) && (
                <header className="header">
                    <center>
                        <h1>Header</h1>
                    </center>
                </header>
            )}

            <div className="main-container">
                <main className="content">{children}</main>
            </div>

            {![paths.form.root].includes(window.location.pathname) && (
                <footer className="footer">
                    <center>
                        <h1>Footer</h1>
                    </center>
                </footer>
            )}
        </div>
    );
};

export default Layout;
