CmdPackages
===========
This public repository is home for publicly developed, example packages for
distribution via [Sencha Cmd](http://www.sencha.com/products/sencha-cmd).

These packages are provided "as is" and we welcome any Pull Requests you may
have for bug fixes or improvements. For details see the [license](LICENSE.txt).

To see the list of packages in this repository, check the `"packages"` folder.

This workspace does not contain any frameworks, but the packages and apps in this workspace
need a framework in order to build.  By default the "ext" and "touch" frameworks are mapped
to the standard paths for a workspace, but we have "ignored these paths from source
control:

    ext.dir=${workspace.dir}/ext
    touch.dir=${workspace.dir}/touch

In order to build the packages and apps in this workspace, either copy a version of the
ext and/or touch framework to the standard path, or modify the `ext.dir` and or `touch.dir`
properties in `.sencha/workspace/sencha.cfg` to point to a location of your choosing.

If you are using Windows, you can run:

    cd CmdPackages
    mklink /D ext C:\Code\ext-5.0.1

You will need to run this as Administrator.
