/*
 * Copyright (c) 2012-2015. Sencha Inc.
 */

package com.sencha.command.php;

import com.caucho.quercus.servlet.QuercusServlet;
import com.sencha.cli.annotations.Doc;
import com.sencha.command.BaseSenchaCommands;
import com.sencha.command.filesystem.StartCommand;
import com.sencha.command.filesystem.WebCommands;
import org.eclipse.jetty.server.Handler;
import org.eclipse.jetty.servlet.ServletContextHandler;

import java.lang.Override;
import java.util.ArrayList;
import java.util.List;

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
        protected List<Handler> getHandlers() {
            List<Handler> handlers = new ArrayList<>();
            
            ServletContextHandler quercusHandler = new ServletContextHandler();
            quercusHandler.addServlet(QuercusServlet.class, "*.php");
            quercusHandler.setClassLoader(QuercusServlet.class.getClassLoader());
            handlers.add(quercusHandler);
            
            return handlers;
        }

    }

    public PhpStartCommand createStart() {
        return new PhpStartCommand(getWebCommands());
    }

}
