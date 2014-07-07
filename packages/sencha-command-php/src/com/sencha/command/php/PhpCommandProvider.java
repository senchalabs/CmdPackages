/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.sencha.command.php;

import com.sencha.cli.CommandProvider;
import com.sencha.cli.Commands;
import com.sencha.cli.annotations.Doc;

public class PhpCommandProvider implements CommandProvider {

    @Override
    public void extendCommands(Commands parent) {

        if("sencha.web".equals(parent.getCommandName(true))) {
            parent.addCommand("php", PhpWebCommands.class);
        }

    }

    @Override
    public String getAntlibResource() {
        return null;
    }
}
