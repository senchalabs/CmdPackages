This is a netbeans project that produces an extension package for Sencha Cmd that adds 
sub commands to the "sencha web" command.

This provides the "sencha web php start" command that will perform the same functions as
the normal "sencha web start" command, but with added support for php provided by quercus.

To build the module, run:

    ant jar

in the project directory.  To test the build output, run:

    ant test-deploy
    
which will copy this extension module into the current Cmd installation on the system.