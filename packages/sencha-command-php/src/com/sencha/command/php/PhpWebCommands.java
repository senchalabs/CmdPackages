/*
 * Copyright (c) 2012-2014. Sencha Inc.
 */

package com.sencha.command.php;

import com.caucho.quercus.servlet.QuercusServlet;
import com.sencha.cli.annotations.Doc;
import com.sencha.command.BaseSenchaCommands;
import com.sencha.command.filesystem.StartCommand;
import com.sencha.command.filesystem.WebCommands;
import org.eclipse.jetty.server.handler.HandlerList;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;

@Doc("Commands to run the web server with PHP support")
public class PhpWebCommands extends BaseSenchaCommands {
    private WebCommands _webCommands;

    public WebCommands getWebCommands() {
        if(_webCommands == null) {
            _webCommands = getParent(WebCommands.class);
        }
        return _webCommands;
    }

    @Doc("starts a web server with php support")
    public class PhpStartCommand extends StartCommand {

        public PhpStartCommand(WebCommands webCommands) {
            super(webCommands);
        }

        @Override
        protected void initHandlers(HandlerList contexts) {
            super.initHandlers(contexts);
            ServletContextHandler servletContext = new ServletContextHandler();
            servletContext.addServlet(QuercusServlet.class, "*.php");
            servletContext.setClassLoader(QuercusServlet.class.getClassLoader());
            contexts.addHandler(servletContext);
        }
    }

    public PhpStartCommand createStart() {
        return new PhpStartCommand(getWebCommands());
    }

}
