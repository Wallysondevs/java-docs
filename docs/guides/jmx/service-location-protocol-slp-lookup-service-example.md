# Serviço de Localização de Protocolo (SLP) Lookup Service

## 19 Serviço de Localização de Protocolo (SLP) Lookup Service

AVISO:

O suporte a CORBA foi removido do JDK, no JDK 11, incluindo a ferramenta `orbd`. Consulte [JEP 320](<https://openjdk.java.net/jeps/320>) para obter detalhes. Este exemplo é mantido para referência.

A JMX API define três bindings para lookup services, utilizando tecnologias de lookup existentes. Este exemplo fornece uma implementação de amostra do Serviço de Localização de Protocolo (SLP) Lookup Service. O código-fonte contido nesta seção é usado para criar os arquivos correspondentes no diretório `examples/` especificado no procedimento de configuração apropriado e inclui:

  * arquivo README
  * Server
  * Client

### examples/Lookup/slp/README
```
    #
    # Copyright (c) 2004, 2019 Oracle and/or its affiliates. All rights reserved.
    # ORACLE PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
    #
    
    # ==============================================================================
    #
    # Example of using SLP as Lookup service - registering and looking up
    # an RMI Connector (IIOP/JRMP)
    #
    # ==============================================================================
    #
    # Requirements:
    #
    # The code provided in this example is build against the Java
    # implementation of SLP - compliant with RFC 2614 see
    # [http://www.ietf.org/rfc/rfc2614.txt].
    #
    #
    # Before running this example you will have to:
    #     get a Java implementation of SLP compliant with
    #     RFC 2614, section 5. You can download the OpenSLP Java implementation
    #     from http://www.openslp.org/. Then you may have to modify Client.java
    #     and Server.java in order to use <my-slp-impl>.slp instead of
    #     com.sun.slp. If your SLP implementation is RFC 2614 compliant
    #     the changes should be limited to replacing 'com.sun.slp' in the
    #     import clauses by '<my-slp-impl>.slp'.
    #
    # If you wish to use an external directory for the RMI JMX Connectors
    # (URLs of the form jmx:service:[rmi|iiop]:/host:port/jndi/jndi-url)
    # then:
    #
    #   o If you wish to use rmiregistry in conjunction with the RMI/JRMP
    #     JMX Connector you will have to start a rmiregistry (see below).
    #
    #   o If you wish to use CORBA Naming Service in conjunction with the RMI/IIOP
    #     JMX Connector you will have to start an ORB daemon (see below).
    #
    #   o If you wish to use LDAP in conjunction with the RMI JMX Connectors
    #     you will have to install/setup a directory server
    #
    # In order to compile and run the example, make a copy of this README file, and
    # then simply cut and paste all the commands as needed into a terminal window.
    #
    # This README makes the assumption that you are running under Java SE 6 on Unix,
    # you are familiar with SLP, the JMX technology, with LDAP and JNDI, and with
    # the bourne shell or korn shell syntax.
    #
    # All the commands below are defined using Unix korn shell syntax.
    #
    # If you are not running Unix and korn shell you are expected to be able to
    # adapt these commands to your favorite OS and shell environment.
    #
    
    # Define the following variables:
    #
    SLPLIB=$SLP_HOME
    
    classp=$SLPLIB/slp.jar
    
    #-------------------------------------------------------------------------------
    # The SLP daemon needs to be launched with root privilege on each
    # host who uses the SLP API. To launch the SLP daemon, simply type
    # the following command line:
    #
    su root -c "java -cp $SLPLIB/slpd.jar com.sun.slp.slpd &"
    
    #-------------------------------------------------------------------------------
    # Start an rmiregistry
    #
    rmiregistry 9999 &
    
    #-------------------------------------------------------------------------------
    # Start an ORB daemon:
    #
    rm -rf ./orb.db
    orbd -ORBInitialPort 7777 &
    
    #-------------------------------------------------------------------------------
    # Start an LDAP Server, and create a new dc=Test suffix inside.
    #
    # (only needed if you wish to register the RMI or IIOP stubs in
    # LDAP, instead of using CORBA Naming Service or RMI registry)
    #
    #       You will have
    #       to make sure the Java Schema (RFC 2713:
    #       http://www.ietf.org/rfc/rfc2713.txt) is known by that server
    
    #-------------------------------------------------------------------------------
    # Compile Server.java and Client.java
    #
    # * Server.java: creates an MBeanServer, creates and starts an
    #                RMI connector (JRMP/IIOP)
    # * Client.java: lookup a connector in SLP
    #                list all MBeans.
    #
    javac -d . -classpath $classp Server.java Client.java
    
    #-------------------------------------------------------------------------------
    # LDAP Parameters
    
    # Supply the appropriate hostname below, and define this variable:
    #
    ldaphost=gigondas
    
    # Supply the appropriate port number below, and define this variable:
    #
    ldapport=6666
    
    # Supply the appropriate principal below, and define this variable:
    #
    principal="cn=Directory Manager"
    
    # Supply the appropriate credentials below, and define this variable:
    #
    credentials=
    
    #-------------------------------------------------------------------------------
    # JNDI URLs
    #
    jndirmi="rmi://localhost:9999"
    jndiiiop="iiop://localhost:7777"
    jndildap="ldap://$ldaphost:$ldapport"
    
    #-------------------------------------------------------------------------------
    # JMX Service URLs
    #
    jmxiiopurl="service:jmx:iiop:///jndi/${jndiiiop}/server"
    jmxrmiurl="service:jmx:rmi:///jndi/${jndirmi}/server"
    jmxiiopldapurl="service:jmx:iiop:///jndi/${jndildap}/cn=x,dc=Test"
    jmxrmildapurl="service:jmx:rmi:///jndi/${jndildap}/cn=x,dc=Test"
    jmxstuburl="service:jmx:rmi://"
    jmxiorurl="service:jmx:iiop://"
    
    #-------------------------------------------------------------------------------
    # Below we illustrate the different JMX Connector Servers
    # which you have the choice to start. 
    # There are seven cases labelled (a) to (f):
    #
    #   * RMI Connectors
    #       + over JRMP
    #           - without any external directory (a)
    #           - using rmiregistry as external directory (b)
    #           - using LDAP as external directory (c)
    #       + over IIOP
    #           - without any external directory (d)
    #           - using CORBA Naming Service as external directory (e)
    #           - using LDAP as external directory (f)
    
    # NOTE-1: As defined in section 6.1 "Terminology" of the "JMX Remote API 1.0
    # Specification" document, an agent is composed of one MBean Server and of
    # one or more Connector Servers. There can be several agents running in one JVM.
    # For flexibility of this example, the slp.Server class creates an agent which
    # is composed of one MBean Server and of only one Connector Server. The class
    # slp.Server decides which type of Connector Server to create depending on the
    # value given to the "url" system property when you start the example.
    
    # NOTE-2: The value of the "agent.name" system property is the value that the
    # slp.Server class will give to the "AgentName" lookup attribute when it
    # registers the connector's URL in the lookup service. As defined in Table 6.1
    # "Lookup attributes for connectors" of the "JMX Remote API 1.0 Specification"
    # document: the "AgentName" lookup attribute is a simple name used to identify
    # the *AGENT* to which the connector is attached. It makes it possible to
    # search, with a query to the lookup service, for all the connectors registered
    # by a given agent.
    
    # (a) You can start an agent with an RMI Connector Server over JRMP
    #     without using any external directory
    #
    java -classpath .:$classp -Ddebug=true \
         -Dagent.name=test-server-a \
         -Durl="service:jmx:rmi://" \
         slp.Server &
    
    # (b) Or you can start an agent with an RMI Connector Server over JRMP
    #     using rmiregistry as external directory
    #     (Start rmiregistry first, if not yet started)
    #
    java -classpath .:$classp -Ddebug=true \
         -Dagent.name=test-server-b \
         -Durl="service:jmx:rmi:///jndi/${jndirmi}/server" \
         slp.Server &
    
    # (c) Or you can start an agent with an RMI Connector Server over JRMP
    #     using LDAP as external directory
    #     (First start an LDAP server and create the dc=Test suffix)
    #
    java -classpath .:$classp -Ddebug=true \
         -Dagent.name=test-server-c \
         -Durl="service:jmx:rmi:///jndi/${jndildap}/cn=x,dc=Test" \
         -Djava.naming.security.principal="$principal" \
         -Djava.naming.security.credentials="$credentials" \
         slp.Server &
    
    # (d) Or you can start an agent with an RMI Connector Server over IIOP
    #     without using any external directory
    #
    java -classpath .:$classp -Ddebug=true \
         -Dagent.name=test-server-d \
         -Durl="service:jmx:iiop://" \
         slp.Server &
    
    # (e) Or you can start an agent with an RMI Connector Server over IIOP
    #     using CORBA Naming Service as external directory
    #     (Start ORBD first if not yet started).
    #
    java -classpath .:$classp -Ddebug=true \
         -Dagent.name=test-server-e \
         -Durl="service:jmx:iiop:///jndi/${jndiiiop}/server" \
         slp.Server &
    
    # (f) Or you can start an agent with an RMI Connector Server over IIOP
    #     using LDAP as external directory
    #     (First start an LDAP server and create the dc=Test suffix) 
    #
    java -classpath .:$classp -Ddebug=true \
         -Dagent.name=test-server-f \
         -Durl="service:jmx:iiop:///jndi/${jndildap}/cn=x,dc=Test" \
         -Djava.naming.security.principal="$principal" \
         -Djava.naming.security.credentials="$credentials" \
         slp.Server &
    
    # Once you have started one or more agents, you can start the Client.
    # Note that for the client to look up through SLP an agent you have just
    # started, you must start the client before your agent's SLP lease has
    # expired. You can update the Server.java file and recompile it to change
    # the lease period.
    #
    java -classpath .:$classp -Ddebug=true \
         -Djava.naming.security.principal="$principal" \
         -Djava.naming.security.credentials="$credentials" \
         slp.Client
    
    #-------------------------------------------------------------------------------
    
```

### examples/Lookup/slp/Server.java
```java
    /*
     * Copyright (c) 2004,2021, Oracle and/or its affiliates. All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted provided that the following conditions
     * are met:
     *
     *   - Redistributions of source code must retain the above copyright
     *     notice, this list of conditions and the following disclaimer.
     *
     *   - Redistributions in binary form must reproduce the above copyright
     *     notice, this list of conditions and the following disclaimer in the
     *     documentation and/or other materials provided with the distribution.
     *
     *   - Neither the name of Oracle or the names of its
     *     contributors may be used to endorse or promote products derived
     *     from this software without specific prior written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
     * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
     * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
     * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
     * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
     * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
     * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
     * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
     * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
     * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     */ 
    
    package slp;
    
    import com.sun.slp.ServiceLocationManager;
    import com.sun.slp.ServiceLocationException;
    import com.sun.slp.Advertiser;
    import com.sun.slp.ServiceURL;
    import com.sun.slp.ServiceLocationAttribute;
    
    import javax.management.*;
    import javax.management.remote.*;
    import javax.management.remote.rmi.*;
    
    import java.util.Map;
    import java.util.List;
    import java.util.HashMap;
    import java.util.ArrayList;
    import java.util.Locale;
    import java.util.Vector;
    import java.io.IOException;
    import java.io.Serializable;
    import java.net.MalformedURLException;
    
    import javax.naming.Context;
    import javax.naming.NamingException;
    
    /**
     * This class demonstrates how to use SLP as a lookup service for
     * JSR 160 connectors. It shows how to register a JMXConnectorServer
     * with the Service Location Protocol.
     * <p>
     * See README file and {@link #main(String[])} for more details.
     * <p>
     * Make sure to read the section "Binding with Lookup Services" of
     * the JMX Remote API 1.0 Specification before looking at this example.
     */
    public class Server {
    
        // The Service URL will remain registered for 300 secs.
        // This is an intentionally long time for the purpose of this example.
        // In practice, a shorter lease, periodically refreshed, is preferable.
        //
        public final static int JMX_DEFAULT_LEASE = 300;
    
        // Default scope.
        //
        public final static String JMX_SCOPE = "DEFAULT";
    
        // The local MBeanServer.
        //
        private final MBeanServer mbs;
    
        private static boolean debug = false;
    
        /**
         * Constructs a Server object. Creates a new MBeanServer.
         */
        public Server() {
            mbs = MBeanServerFactory.createMBeanServer();
        }
    
        /**
         * Registers a JMX Connector URL with the SLP Lookup Service.
         *
         * @param jmxUrl A JMX Connector Server URL obtained from
         *               {@link JMXConnectorServer#getAddress()
         *               JMXConnectorServer.getAddress()}
         * @param name   The AgentName with which the URL will be
         *               registered in the SLP Lookup Service.
         */
        public static void register(JMXServiceURL jmxUrl, String name)
            throws ServiceLocationException {
    
            // Create the SLP service URL
            //
            // Note: It is recommended that the JMX Agents make use of the
            // leasing feature of SLP, and periodically renew their lease
            //
            ServiceURL serviceURL = new ServiceURL(jmxUrl.toString(),
                                                   JMX_DEFAULT_LEASE);
    
            System.out.println("\nRegistering URL for " +  name + ": " + jmxUrl);
            debug("ServiceType is: " + serviceURL.getServiceType());
    
            // Prepare Lookup Attributes
            //
            Vector attributes = new Vector();
            Vector attrValues = new Vector();
    
            // Specify default SLP scope
            //
            attrValues.add(JMX_SCOPE);
            ServiceLocationAttribute attr1 =
                new ServiceLocationAttribute("SCOPE", attrValues);
            attributes.add(attr1);
    
            // Specify AgentName attribute (mandatory)
            //
            attrValues.removeAllElements();
            attrValues.add(name);
            ServiceLocationAttribute attr2 =
                new ServiceLocationAttribute("AgentName", attrValues);
            attributes.add(attr2);
    
            // Register with SLP
            // -----------------
    
            // Get SLP Advertiser
            //
            final Advertiser slpAdvertiser =
                ServiceLocationManager.getAdvertiser(Locale.US);
    
            // Register the service: URL
            //
            slpAdvertiser.register(serviceURL, attributes);
            System.out.println("\nRegistered URL: " + jmxUrl);
        }
    
        /**
         * Creates an RMI Connector Server, starts it, and registers it
         * with the SLP Lookup Service.
         * <p>
         * This method will transfer a fixed set of System Properties to
         * the Map given to the RMIConnectorServer constructor. Some
         * JNDI properties, if defined, are transfered to the Map so
         * that they may be used when LDAP is used as external directory
         * to register the RMI Stub (see {@link javax.management.remote.rmi}
         * JavaDoc). Note that even if LDAP is used as external directory
         * the {@link Context#INITIAL_CONTEXT_FACTORY
         *            Context.INITIAL_CONTEXT_FACTORY} and
         * {@link Context#PROVIDER_URL Context.PROVIDER_URL} properties
         * usually don't need to be passed.
         * <p>
         * The following System properties, if defined, are transfered to
         * the Map given to the RMIConnectorServer constructor.
         * <ul><li>{@link Context#INITIAL_CONTEXT_FACTORY
         *           Context.INITIAL_CONTEXT_FACTORY}</li>
         *     <li>{@link Context#PROVIDER_URL
         *           Context.PROVIDER_URL}</li>
         *     <li>{@link Context#SECURITY_PRINCIPAL
         *           Context.SECURITY_PRINCIPAL}</li>
         *     <li>{@link Context#SECURITY_CREDENTIALS
         *           Context.SECURITY_CREDENTIALS}</li>
         *     <li>{@link RMIConnectorServer#JNDI_REBIND_ATTRIBUTE
         *           RMIConnectorServer.JNDI_REBIND_ATTRIBUTE} - default
         *           is <code>true</code>.</li>
         * </ul>
         *
         * @param url A string representation of the JMXServiceURL.
         *
         * @return the created RMIConnectorServer.
         */
        public JMXConnectorServer rmi(String url) throws
            IOException,
            JMException,
            NamingException,
            ClassNotFoundException,
            ServiceLocationException {
    
            // Make a JMXServiceURL from the url string.
            //
            JMXServiceURL jurl = new JMXServiceURL(url);
    
            // Prepare the environment Map
            //
            final HashMap env = new HashMap();
            final String rprop = RMIConnectorServer.JNDI_REBIND_ATTRIBUTE;
            final String rebind = System.getProperty(rprop,"true");
            final String factory =
                System.getProperty(Context.INITIAL_CONTEXT_FACTORY);
            final String ldapServerUrl =
                System.getProperty(Context.PROVIDER_URL);
            final String ldapUser =
                System.getProperty(Context.SECURITY_PRINCIPAL);
            final String ldapPasswd =
                System.getProperty(Context.SECURITY_CREDENTIALS);
    
            // Transfer some system properties to the Map
            //
            if (factory!= null) // this should not be needed
                env.put(Context.INITIAL_CONTEXT_FACTORY,factory);
            if (ldapServerUrl!=null) // this should not be needed
                env.put(Context.PROVIDER_URL, ldapServerUrl);
            if (ldapUser!=null) // this is needed when LDAP is used
                env.put(Context.SECURITY_PRINCIPAL, ldapUser);
            if (ldapPasswd != null) // this is needed when LDAP is used
                env.put(Context.SECURITY_CREDENTIALS, ldapPasswd);
            env.put(rprop,rebind); // default is true.
    
            // Create an RMIConnectorServer
            //
            System.out.println("Creating RMI Connector: " + jurl);
            JMXConnectorServer rmis =
                JMXConnectorServerFactory.newJMXConnectorServer(jurl, env, mbs);
    
            // Get the AgentName for registering the Connector in the Lookup Service
            //
            final String agentName = System.getProperty("agent.name",
                                                        "DefaultAgent");
    
            // Start the connector and register it with SLP Lookup Service
            //
            start(rmis, agentName);
    
            return rmis;
        }
    
        /**
         * Start a JMXConnectorServer and register it with SLP Lookup Service.
         *
         * @param server the JMXConnectorServer to start and register.
         * @param agentName the AgentName with which the URL must be registered
         *                  in the SLP Lookup Service.
         */
        public void start(JMXConnectorServer server, String agentName)
            throws IOException, ServiceLocationException {
    
            // Start the JMXConnectorServer
            //
            server.start();
    
            // Create a JMX Service URL to register with SLP
            //
            final JMXServiceURL address = server.getAddress();
    
            // Register the URL with the SLP Lookup Service.
            //
            register(address, agentName);
        }
    
        /**
         * Trace a debug message.
         */
        private static void debug(String msg) {
            if (debug) System.out.println(msg);
        }
    
        /**
         * Program Main
         * <p>
         * Creates a server object, gets the JMX Service URL, and calls
         * the method that will create and register the appropriate JMX
         * Connector Server for that URL.
         * <p>
         * You may wish to use the following properties on the Java command line:
         * <ul>
         * <li><code>-Durl=&lt;jmxServiceURL&gt;</code>: specifies the URL of
         *     the JMX Connector Server you wish to use. See README file for more
         *     details.</li>
         * <li><code>-Dagent.name=&lt;AgentName&gt;</code>: specifies the
         *     AgentName to register with.</li>
         * <li><code>-Ddebug="true|false"</code>: switch the Server debug flag
         *     on/off (default is "false").</li>
         * </ul>
         */
        public static void main(String[] args) {
            try {
                // Get the value of the debug flag.
                //
                debug = (Boolean.valueOf(System.getProperty("debug","false"))).
                    booleanValue();
    
                // Create a new Server object.
                //
                final Server s = new Server();
    
                // Get the JMXConnector URL
                //
                final String url = System.getProperty("url", "service:jmx:rmi://");
    
                // Build a JMXServiceURL
                //
                final JMXServiceURL jurl = new JMXServiceURL(url);
    
                // Creates a JMX Connector Server
                //
                debug("Creating Connector: " + jurl);
                final String p = jurl.getProtocol();
                if (p.equals("rmi"))         // Create an RMI Connector
                    s.rmi(url);
                else if (p.equals("iiop"))   // Create an RMI/IIOP Connector
                    s.rmi(url);
                else                         // Unsupported protocol
                    throw new MalformedURLException("Unsupported protocol: " + p);
    
                System.out.println("\nService URL successfully registered " +
                                   "in the SLP Lookup Service");
    
            } catch (Exception x) {
                System.err.println("Unexpected exception caught in main: " + x);
                x.printStackTrace(System.err);
            }
        }
    }
    
```

### examples/Lookup/slp/Client.java
```java
    /*
     * Copyright (c) 2004, Oracle and/or its affiliates. All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted provided that the following conditions
     * are met:
     *
     *   - Redistributions of source code must retain the above copyright
     *     notice, this list of conditions and the following disclaimer.
     *
     *   - Redistributions in binary form must reproduce the above copyright
     *     notice, this list of conditions and the following disclaimer in the
     *     documentation and/or other materials provided with the distribution.
     *
     *   - Neither the name of Oracle or the names of its
     *     contributors may be used to endorse or promote products derived
     *     from this software without specific prior written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
     * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
     * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
     * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR
     * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
     * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
     * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
     * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
     * LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
     * NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
     * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     */ 
    
    package slp;
    
    import com.sun.slp.ServiceLocationManager;
    import com.sun.slp.ServiceLocationException;
    import com.sun.slp.Locator;
    import com.sun.slp.ServiceURL;
    import com.sun.slp.ServiceLocationAttribute;
    import com.sun.slp.ServiceType;
    import com.sun.slp.ServiceLocationEnumeration;
    
    import javax.management.*;
    import javax.management.remote.*;
    
    import javax.naming.Context;
    
    import java.util.List;
    import java.util.ArrayList;
    import java.util.HashMap;
    import java.util.Map;
    import java.util.Set;
    import java.util.Iterator;
    import java.util.Locale;
    import java.util.Vector;
    
    import java.io.IOException;
    import java.io.Serializable;
    
    /**
     * This class demonstrates how to use SLP as a lookup service for
     * JSR 160 connectors. It shows how to lookup a JMXServiceURL
     * from the SLP lookup service.
     * <p>
     * See README file and {@link #main(String[])} for more details.
     * <p>
     * Make sure to read the section "Binding with Lookup Services" of
     * the JMX Remote API 1.0 Specification before looking at this example.
     */
    public class Client {
    
        // Default scope.
        //
        public final static String JMX_SCOPE = "DEFAULT";
    
        private static boolean debug = false;
    
        /**
         * Get a pointer to the SLP Lookup Service.
         * (See RFC 2614 for more info).
         * @return a pointer to the SLP Lookup Service.
         */
        public static Locator getLocator() throws ServiceLocationException {
            // Getting the Locator (for lookup purposes)
            //
            final Locator slpLocator = ServiceLocationManager.getLocator(Locale.US);
            return slpLocator;
        }
    
        /**
         * Lookup JMXConnectors in the SLP Lookup Service.
         *
         * @param slpLocator A pointer to the SLP Lookup Service,
         *        returned by {@link #getLocator()}.
         * @param name the AgentName of the JMXConnectors that should
         *        be returned. If <var>name</var> is null, then
         *        the JMXConnectors for all agents are returned
         *        (null is an equivalent for a wildcard).
         * @return The list of matching JMXConnectors retrieved from
         *         the SLP Lookup Service.
         */
        public static List lookup(Locator slpLocator, String name)
            throws IOException, ServiceLocationException {
    
            final ArrayList list = new ArrayList();
    
            // Set the lookup SCOPE.
            //
            Vector scopes = new Vector();
            scopes.add(JMX_SCOPE);
    
            // Set the LDAPv3 query string
            //
            // Will return only those services for which the AgentName
            // attribute was registered. Since JSR 160 specifies that
            // the AgentName attribute is mandatory, this makes it possible
            // to filter out all the services that do not conform
            // to the spec.
            // If <name> is null, it is replaced by "*", so that all
            // services for which the AgentName attribute was specified match,
            // regardless of the value of that attribute.
            // Otherwise, only those services for which AgentName matches the
            // name or pattern specified by <name> will be returned.
            //
            String query = "(&(AgentName=" + ((name!=null)?name:"*") + "))";
    
            debug("Looking up JMX Agents with filter: " + query );
    
            // Lookup the JMX agents....
            //
            ServiceLocationEnumeration result =
                slpLocator.findServices(new ServiceType("service:jmx"),
                                        scopes, query);
    
            debug("... Got service enumeration.");
    
            // Build the JMXConnector list
            //
            while (result.hasMoreElements()) {
                final ServiceURL surl = (ServiceURL) result.next();
                debug("\nFound Service URL: " + surl);
    
                // Some debug info:
                //
                if (debug) {
                    // Retrieve the Lookup Attributes that were registered
                    // with this URL
                    //
                    debug("Getting attributes...");
                    final ServiceLocationEnumeration slpAttributes =
                        slpLocator.findAttributes(surl, scopes, new Vector());
                    debug("... Got attribute enumeration.");
                    while (slpAttributes.hasMoreElements()) {
                        final ServiceLocationAttribute slpAttribute =
                            (ServiceLocationAttribute) slpAttributes.nextElement();
                        debug("\tAttribute: " + slpAttribute);
                    }
                }
    
                // Create a JMXConnector
                // ---------------------
    
                // Create a JMX Service URL
                //
                JMXServiceURL jmxUrl = new JMXServiceURL(surl.toString());
                debug("JMX Service URL: " + jmxUrl);
    
                // Obtain a JMXConnector from the factory
                //
                try {
                    JMXConnector client =
                        JMXConnectorFactory.newJMXConnector(jmxUrl,null);
                    debug("JMX Connector: " + client);
    
                    // Add the connector to the result list.
                    //
                    if (client != null) list.add(client);
                } catch (IOException x ) {
                    System.err.println("Failed to create JMXConnector for " +
                                       jmxUrl);
                    System.err.println("Error is: " + x);
                    System.err.println("Skipping...");
                }
            }
    
            return list;
        }
    
        /**
         * List all MBeans and their attributes.
         */
        public static void listMBeans(MBeanServerConnection server)
            throws IOException {
    
            final Set names = server.queryNames(null,null);
            for (final Iterator i=names.iterator(); i.hasNext(); ) {
                ObjectName name = (ObjectName)i.next();
                System.out.println("Got MBean: "+name);
                try {
                    MBeanInfo info =
                        server.getMBeanInfo((ObjectName)name);
                    MBeanAttributeInfo[] attrs = info.getAttributes();
```
```java
                    if (attrs == null) continue;
                    for (int j=0; j<attrs.length; j++) {
                        if (attrs[j].isReadable()) {
                            try {
                                Object o =
                                    server.getAttribute(name,attrs[j].getName());
                                System.out.println("\t\t" + attrs[j].getName() +
                                                   " = "+o);
                            } catch (Exception x) {
                                System.err.println("JmxClient failed to get " +
                                                   attrs[j].getName());
                                x.printStackTrace(System.err);
                            }
                        }
                    }
                } catch (Exception x) {
                    System.err.println("JmxClient failed to get MBeanInfo: "  + x);
                    x.printStackTrace(System.err);
                }
            }
        }
    
        /**
         * Rastreia uma mensagem de depuração.
         */
        private static void debug(String msg) {
            if (debug) System.out.println(msg);
        }
    
        /**
         * Principal do Programa.
         * <p>
         * Procura por todos os agentes JMX no SLP Lookup Service e lista
         * seus MBeans e atributos.
         * <p>
         * Você pode querer usar as seguintes propriedades na linha de comando Java:
         * <ul>
         * <li><code>-Dagent.name=&lt;AgentName&gt;</code>: especifica um
         *     AgentName para procurar (o padrão é null, significando qualquer agente).</li>
         * <li><code>-Ddebug="true|false"</code>: liga/desliga a flag de depuração do Cliente
         *     (o padrão é "false").</li>
         * </ul>
         */
        public static void main(String[] args) {
            try {
                // Obtém o valor da flag de depuração.
                //
                debug = (Boolean.valueOf(System.getProperty("debug","false"))).
                    booleanValue();
    
                // Obtém o AgentName para procurar.
                // Se não definido, todos os agentes são considerados.
                //
                final String agentName = System.getProperty("agent.name");
    
                // Obtém um ponteiro para o SLP Lookup Service.
                //
                final Locator slpLocator = getLocator();
                debug("slpLocator is: " + slpLocator);
    
                // Procura por todos os agentes correspondentes no SLP Lookup Service.
                //
                List l = lookup(slpLocator,agentName);
    
                // Tenta conectar-se aos agentes recuperados
                //
                System.out.println("\nNumber of agents found : " + l.size());
                int j = 1;
                for (Iterator i=l.iterator();i.hasNext();j++) {
                    JMXConnector c1 = (JMXConnector) i.next();
                    if (c1 != null) {
    
                        // Conectar
                        //
                        System.out.println(
                          "\n----------------------------------------------------");
                        System.out.println("\tConnecting to agent number "+j);
                        System.out.println(
                          "----------------------------------------------------");
                        debug("JMXConnector is: " + c1);
    
                        // Prepara o Map de ambiente
                        //
                        final HashMap env = new HashMap();
                        final String factory =
                            System.getProperty(Context.INITIAL_CONTEXT_FACTORY);
                        final String ldapServerUrl =
                            System.getProperty(Context.PROVIDER_URL);
                        final String ldapUser =
                            System.getProperty(Context.SECURITY_PRINCIPAL);
                        final String ldapPasswd =
                            System.getProperty(Context.SECURITY_CREDENTIALS);
    
                        // Transfere algumas propriedades do sistema para o Map
                        //
                        if (factory!= null) // isso não deveria ser necessário
                            env.put(Context.INITIAL_CONTEXT_FACTORY,factory);
                        if (ldapServerUrl!=null) // isso não deveria ser necessário
                            env.put(Context.PROVIDER_URL, ldapServerUrl);
                        if (ldapUser!=null) // isso é necessário quando LDAP é usado
                            env.put(Context.SECURITY_PRINCIPAL, ldapUser);
                        if (ldapPasswd != null) // isso é necessário quando LDAP é usado
                            env.put(Context.SECURITY_CREDENTIALS, ldapPasswd);
    
                        try {
                            c1.connect(env);
                        } catch (IOException x) {
                            System.err.println("Connection failed: " + x);
                            x.printStackTrace(System.err);
                            continue;
                        }
    
                        // Obtém MBeanServerConnection
                        //
                        MBeanServerConnection conn =
                            c1.getMBeanServerConnection();
                        debug("Connection is:" + conn);
                        System.out.println("Server domain is: " +
                                           conn.getDefaultDomain());
    
                        // Lista todos os MBeans
                        //
                        try {
                            listMBeans(conn);
                        } catch (IOException x) {
                            System.err.println("Failed to list MBeans: " + x);
                            x.printStackTrace(System.err);
                        }
    
                        // Fecha o conector
                        //
                        try {
                            c1.close();
                        } catch (IOException x) {
                            System.err.println("Failed to close connection: " + x);
                            x.printStackTrace(System.err);
                        }
                    }
                }
            } catch (Exception x) {
                System.err.println("Unexpected exception caught in main: " + x);
                x.printStackTrace(System.err);
            }
        }
    }
```